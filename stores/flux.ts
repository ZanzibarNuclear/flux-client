import { defineStore } from 'pinia'
import type { Flux } from '@/utils/types'

export const useFluxStore = defineStore('flux', () => {
  // State
  const activeFlux = ref<Flux | null>(null)
  const timelineFluxes = ref<Flux[]>([])

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
    activeFlux,
    setActiveFlux,
    clearActiveFlux,
    timelineFluxes,
    setTimelineFluxes,
  }
})
