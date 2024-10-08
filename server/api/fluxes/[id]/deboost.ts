import { defineEventHandler } from 'h3'

// This should be imported from a shared file in a real application
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
  }
]

export default defineEventHandler((event) => {
  const id = parseInt(event.context.params.id)
  const flux = fluxes.find(f => f.id === id)
  if (!flux) {
    throw createError({ statusCode: 404, statusMessage: 'Flux not found' })
  }
  flux.boostCount -= 1
  flux.boosted = false
  return flux
})
