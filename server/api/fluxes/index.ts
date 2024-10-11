import { defineEventHandler, getQuery, readBody } from 'h3'
import { serverSupabaseClient } from '#supabase/server'

// In-memory store for fluxes

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const client = await serverSupabaseClient(event)

  // GET /api/fluxes
  if (method === 'GET') {
    const query = getQuery(event)
    const { filter, author } = query

    let fluxQuery = client
      .from('fluxes')
      .select('*, author:flux_users(*)')

    // Filter by author if specified
    if (author) {
      fluxQuery = fluxQuery.eq('flux_users.handle', author)
    }

    // Apply sorting based on filter
    switch (filter) {
      case 'recent':
        fluxQuery = fluxQuery.order('updated_at', { ascending: false })
        break
      case 'trendy':
        fluxQuery = fluxQuery.order('boost_count', { ascending: false }).order('updated_at', { ascending: false })
        break
      default:
        // Default to most recent
        fluxQuery = fluxQuery.order('updated_at', { ascending: false })
    }

    const { data: filteredFluxes, error } = await fluxQuery

    if (error) {
      console.error('Error fetching fluxes:', error)
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to fetch fluxes',
      })
    }

    console.log('fluxes found:', filteredFluxes)
    return filteredFluxes
  }

  // POST /api/fluxes
  if (method === 'POST') {
    const body = await readBody(event)
    console.log(body)

    const parentFluxId = body.parentId

    const { data: newFlux, error } = await client
      .from('fluxes')
      .insert({
        flux_user_id: body.authorId,
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

    if (parentFluxId) {
      console.log('increase reply count for', parentFluxId)
      const { count: replyCount, error: countError } = await client
        .from('fluxes')
        .select('id', { count: 'exact' })
        .eq('parent_id', parentFluxId)

      if (countError) {
        console.error('Error counting replies:', countError)
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to count replies',
        })
      }

      console.log('Number of replies:', replyCount)
      const { error: updateError } = await client
        .from('fluxes')
        .update({ reply_count: replyCount })
        .eq('id', parentFluxId)

      if (updateError) {
        console.error('Error updating reply count:', updateError)
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to update reply count',
        })
      }
    } else {
      console.log('Not a reply, so no affect on reply count')
    }

    return newFlux
  }
})
