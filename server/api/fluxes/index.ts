import { defineEventHandler, getQuery, readBody } from 'h3'

// In-memory store for fluxes
let fluxes = [
  {
    id: 1,
    author: "John Doe",
    authorUsername: "johndoe",
    authorAvatar: "https://api.dicebear.com/6.x/initials/svg?seed=JD",
    content: "This is a sample flux. #FirstFlux",
    timestamp: new Date().toISOString(),
    replyCount: 2,
    boostCount: 0,
    viewCount: 10,
    boosted: false
  },
  {
    id: 2,
    author: "Jane Dear",
    authorUsername: "janedoe",
    authorAvatar: "https://api.dicebear.com/6.x/initials/svg?seed=JD",
    content: "This is another sample flux. Fluxing is fun. Always flux before you leave in the morning. #FluxYourPower",
    timestamp: new Date().toISOString(),
    replyCount: 2,
    boostCount: 100,
    viewCount: 37,
    boosted: false
  },
  {
    id: 3,
    author: "Jack Inthebox",
    authorUsername: "jackinthebox",
    authorAvatar: "https://api.dicebear.com/6.x/initials/svg?seed=JD",
    content: "Jack is back, with sourdough like you've never tasted before. #SourdoughRules",
    timestamp: new Date().toISOString(),
    replyCount: 42,
    boostCount: 200,
    viewCount: 3737,
    boosted: false
  },
  {
    id: 4,
    author: "Jane Dear",
    authorUsername: "janedoe",
    authorAvatar: "https://api.dicebear.com/6.x/initials/svg?seed=JD",
    content: "Sometime inspiration arrives just when you need it most.",
    timestamp: new Date().toISOString(),
    replyCount: 2,
    boostCount: 550,
    viewCount: 3700,
    boosted: true
  },
  {
    id: 5,
    author: "Jane Dear",
    authorUsername: "janedoe",
    authorAvatar: "https://api.dicebear.com/6.x/initials/svg?seed=JD",
    content: "It's the little things that matter.",
    timestamp: new Date().toISOString(),
    replyCount: 2,
    boostCount: 1,
    viewCount: 3,
    boosted: false
  },
]

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
    const newFlux = {
      id: fluxes.length + 1,
      ...body,
      timestamp: new Date().toISOString(),
      replyCount: 0,
      boostCount: 0,
      viewCount: 0,
      boosted: false
    }
    fluxes.push(newFlux)
    return newFlux
  }
})