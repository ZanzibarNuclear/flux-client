import { defineEventHandler, readBody } from 'h3'

let fluxes = [
  {
    id: 201,
    author: "Jane Doe",
    authorUsername: "janedoe",
    authorAvatar: "https://api.dicebear.com/6.x/initials/svg?seed=JD",
    content: "This is a sample reply. #Fluxback",
    timestamp: new Date().toISOString(),
    replyCount: 0,
    boostCount: 0,
    viewCount: 0,
    boosted: false
  },
  {
    id: 202,
    author: "Bubba Gump",
    authorUsername: "bubbagump",
    authorAvatar: "https://api.dicebear.com/6.x/initials/svg?seed=JD",
    content: "This is another sample reply. #Fluxback",
    timestamp: new Date().toISOString(),
    replyCount: 0,
    boostCount: 200,
    viewCount: 0,
    boosted: true
  },
]

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const parent_id = parseInt(event.context.params?.id || '0')

  // GET /api/fluxes
  if (method === 'GET') {
    return fluxes
  }

  // POST /api/fluxes/:id/replies
  if (method === 'POST') {
    const body = await readBody(event)
    const newFlux = {
      id: fluxes.length + 1,
      ...body,
      parentId: parent_id,
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