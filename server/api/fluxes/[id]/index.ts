import { defineEventHandler, readBody } from 'h3'
import { fluxes } from '../../../data/fluxes'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  const method = event.node.req.method

  // GET /api/fluxes/:id
  if (method === 'GET') {
    const flux = fluxes.find(f => f.id === id)
    if (!flux) {
      throw createError({ statusCode: 404, statusMessage: 'Flux not found' })
    }
    return flux
  }

  // PUT /api/fluxes/:id
  if (method === 'PUT') {
    const body = await readBody(event)
    const index = fluxes.findIndex(f => f.id === id)
    if (index === -1) {
      throw createError({ statusCode: 404, statusMessage: 'Flux not found' })
    }
    fluxes[index] = { ...fluxes[index], ...body }
    return fluxes[index]
  }

  // DELETE /api/fluxes/:id
  if (method === 'DELETE') {
    const index = fluxes.findIndex(f => f.id === id)
    if (index === -1) {
      throw createError({ statusCode: 404, statusMessage: 'Flux not found' })
    }
    const deletedFlux = fluxes.splice(index, 1)[0]
    return deletedFlux
  }
})