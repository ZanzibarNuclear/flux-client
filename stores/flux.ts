import { defineStore } from 'pinia'
import type { Flux, FluxAuthor } from '@/utils/types'

export const useFluxStore = defineStore('flux', () => {
  // State
  const activeAuthor = ref<FluxAuthor | null>(null)
  const activeFlux = ref<Flux | null>(null)
  const timelineFluxes = ref<Flux[]>([])

  function setActiveAuthor(author: FluxAuthor) {
    activeAuthor.value = author
  }

  function clearActiveAuthor() {
    activeAuthor.value = null
  }

  function setActiveFlux(flux: Flux) {
    activeFlux.value = flux
  }

  function clearActiveFlux() {
    activeFlux.value = null
  }

  function setTimelineFluxes(fluxes: Flux[]) {
    timelineFluxes.value = fluxes
  }

  return {
    activeAuthor,
    setActiveAuthor,
    clearActiveAuthor,
    activeFlux,
    setActiveFlux,
    clearActiveFlux,
    timelineFluxes,
    setTimelineFluxes,
  }
})
