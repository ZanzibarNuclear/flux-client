import { defineStore } from 'pinia'
import type { Flux } from '@/utils/types'

export const useFluxStore = defineStore('flux', () => {
  // State
  const activeFlux = ref<Flux | null>(null)

  function setActiveFlux(flux: Flux) {
    activeFlux.value = flux
  }

  function clearActiveFlux() {
    activeFlux.value = null
  }

  return {
    activeFlux,
    setActiveFlux,
    clearActiveFlux,
  }
})
