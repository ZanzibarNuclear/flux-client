import { defineEventHandler, readBody } from 'h3'

// In-memory store for fluxes
let fluxes = [
  {
    id: 1,
    author: "John Doe",
    authorUsername: "johndoe",
    authorAvatar: "https://api.dicebear.com/6.x/initials/svg?seed=JD",
    content: "This is a sample flux. #FirstFlux",
    timestamp: new Date().toISOString(),
    replyCount: 0,
    boostCount: 0,
    viewCount: 0,
    boosted: false
  },
  {
    id: 2,
    author: "Jane Dear",
    authorUsername: "janedoe",
    authorAvatar: "https://api.dicebear.com/6.x/initials/svg?seed=JD",
    content: "This is another sample flux. Fluxing is fun. Always flux before you leave in the morning. #FluxYourPower",
    timestamp: new Date().toISOString(),
    replyCount: 42,
    boostCount: 100,
    viewCount: 3737,
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
    boostCount: 100,
    viewCount: 3737,
    boosted: false
  },
]

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  // GET /api/fluxes
  if (method === 'GET') {
    console.log('GET /api/fluxes')
    return fluxes
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