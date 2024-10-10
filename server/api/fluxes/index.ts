import { defineEventHandler, getQuery, readBody } from 'h3'
import { serverSupabaseClient } from '#supabase/server'
import { fluxes } from '../../data/fluxes'

// In-memory store for fluxes

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const client = await serverSupabaseClient(event)

  // GET /api/fluxes
  if (method === 'GET') {
    const query = getQuery(event)
    const { filter, author } = query

    let filteredFluxes = [...fluxes]

    // Filter by author if specified
    if (author) {
      filteredFluxes = filteredFluxes.filter(flux => flux.author.handle === author)
    }

    // Apply sorting based on filter
    switch (filter) {
      case 'recent':
        filteredFluxes.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        break
      case 'trendy':
        filteredFluxes.sort((a, b) => {
          const timeA = new Date(a.timestamp).getTime()
          const timeB = new Date(b.timestamp).getTime()
          const boostA = a.boostCount
          const boostB = b.boostCount
          // Combine recency and boost count (you can adjust the weight as needed)
          return (boostB - boostA) * 1000 + (timeB - timeA)
        })
        break
      default:
        // Default to most recent
        filteredFluxes.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    }

    return filteredFluxes
  }

  // POST /api/fluxes
  if (method === 'POST') {
    const body = await readBody(event)
    console.log(body)

    const { data: newFlux, error } = await client
      .from('fluxes')
      .insert({
        author_id: body.authorId,
        content: body.content,
        parent_id: body.parentId || null,
      })
      .select('*, author:flux_authors(*)')
      .single()

    if (error) {
      console.error('Error inserting flux:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to create flux',
      })
    }

    console.log(newFlux)
    return newFlux
  }
})