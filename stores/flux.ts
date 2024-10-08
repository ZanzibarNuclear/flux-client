import { defineStore } from 'pinia'
import type { Flux } from '@/utils/types'

export const useFluxStore = defineStore('flux', () => {
  // State
  const fluxes = ref<Flux[]>([])
  const currentThreadId = ref<number | null>(null)

  // Actions
  function setFluxes(newFluxes: Flux[]) {
    fluxes.value = newFluxes
  }

  function addFlux(newFlux: Flux) {
    fluxes.value.push(newFlux)
  }

  function setFocus(fluxId: number) {
    currentThreadId.value = fluxId
  }

  function clearFocus() {
    currentThreadId.value = null
  }

  // Getters
  const getFluxById = computed(() => (id: number) => {
    return fluxes.value.find(flux => flux.id === id)
  })

  const selectedFlux = computed(() => {
    return fluxes.value.find(flux => flux.id === currentThreadId.value)
  })

  return {
    fluxes,
    currentThreadId,
    setFluxes,
    addFlux,
    setFocus,
    clearFocus,
    getFluxById,
    selectedFlux,
  }
})
