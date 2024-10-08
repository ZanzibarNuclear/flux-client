import { defineEventHandler } from 'h3'
import { fluxes } from '../../../data/fluxes'

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
