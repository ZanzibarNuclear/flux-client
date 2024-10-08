import { defineEventHandler, readBody } from 'h3'
import { fluxes } from '../../../../data/fluxes'

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const parentId = parseInt(event.context.params?.id || '0')

  // GET /api/fluxes
  if (method === 'GET') {
    return [...fluxes].filter(flux => flux.parentId === parentId)
  }

  // POST /api/fluxes/:id/replies
  if (method === 'POST') {
    const body = await readBody(event)
    const newFlux = {
      id: fluxes.length + 1,
      ...body,
      parentId: parentId,
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