import { defineEventHandler, getQuery, readBody } from 'h3'
import { fluxes } from '../../data/fluxes'

// In-memory store for fluxes

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  // GET /api/fluxes
  if (method === 'GET') {
    const query = getQuery(event)
    const { filter, author } = query

    let filteredFluxes = [...fluxes]

    // Filter by author if specified
    if (author) {
      filteredFluxes = filteredFluxes.filter(flux => flux.authorUsername === author)
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
    const newFlux = {
      id: fluxes.length + 1,
      author: {
        handle: body.author,
        displayName: "Zanzibar Nuhero",
        avatar: "https://api.dicebear.com/6.x/initials/svg?seed=ZN",
      },
      content: body.content,
      parentId: body.parent_id,
      timestamp: new Date().toISOString(),
      replyCount: 0,
      boostCount: 0,
      viewCount: 0,
      userReaction: {
        boosted: false,
        replied: false,
      }
    }
    console.log(newFlux)
    fluxes.push(newFlux)
    return newFlux
  }
})