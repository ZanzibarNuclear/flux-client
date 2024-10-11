import { defineStore } from 'pinia'
import type { Flux, FluxUser } from '@/utils/types'

export const useFluxStore = defineStore('flux', () => {
  // State
  const fluxUser = ref<FluxUser | null>(null)
  const timeline = ref<Flux[]>([])  // shows relevant fluxes for user
  const activeFlux = ref<Flux | null>(null)
  const reactions = ref<Flux[]>([]) // shows replies to activeFlux

  function setFluxUser(myFluxUser: FluxUser) {
    fluxUser.value = myFluxUser
  }

  function clearFluxUser() {
    fluxUser.value = null
  }

  function setActiveFlux(flux: Flux) {
    activeFlux.value = flux
    reactions.value = []
  }

  function clearActiveFlux() {
    activeFlux.value = null
  }

  function setTimeline(fluxes: Flux[]) {
    timeline.value = fluxes
  }

  function addToTimeline(flux: Flux) {
    timeline.value.unshift(flux)
  }

  function clearTimeline() {
    timeline.value = []
  }

  function setReactions(fluxes: Flux[]) {
    reactions.value = fluxes
  }

  function addReply(flux: Flux) {
    reactions.value.unshift(flux)
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
    addToTimeline,
    clearActiveFlux,
    reactions,
    setReactions,
    addReply,
    clearReactions,
  }
})
