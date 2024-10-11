import { defineStore } from 'pinia'
import type { Flux, FluxUser } from '@/utils/types'

export const useFluxStore = defineStore('flux', () => {
  // State
  const fluxUser = ref<FluxUser | null>(null)
  const timeline = ref<Flux[]>([])  // shows relevant fluxes for user
  const activeFlux = ref<Flux | null>(null)
  const reactions = ref<Flux[]>([]) // shows replies to activeFlux

  function setFluxUser(author: FluxUser) {
    fluxUser.value = author
  }

  function clearFluxUser() {
    fluxUser.value = null
  }

  function setActiveFlux(flux: Flux) {
    activeFlux.value = flux
  }

  function clearActiveFlux() {
    activeFlux.value = null
  }

  function setTimeline(fluxes: Flux[]) {
    timeline.value = fluxes
  }

  function clearTimeline() {
    timeline.value = []
  }

  function setReactions(fluxes: Flux[]) {
    reactions.value = fluxes
  }

  function clearReactions() {
    reactions.value = []
  }

  return {
    fluxUser,
    setFluxUser,
    clearFluxUser,
    timeline,
    setTimeline,
    clearTimeline,
    activeFlux,
    setActiveFlux,
    clearActiveFlux,
    reactions,
    setReactions,
    clearReactions,
  }
})
