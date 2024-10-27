import { defineStore } from 'pinia'
import type { Flux, FluxProfile } from '@/utils/types'

export const useFluxStore = defineStore('fluxStore', () => {
  // State
  const profile = ref<FluxProfile | null>(null)
  const timeline = ref<Flux[]>([])  // shows relevant fluxes for user
  const activeFlux = ref<Flux | null>(null)
  const reactions = ref<Flux[]>([]) // shows replies to activeFlux

  const hasProfile = computed(() => !!profile.value)

  function setProfile(myProfile: FluxProfile) {
    profile.value = myProfile
  }

  function clearProfile() {
    profile.value = null
  }

  function setActiveFlux(flux: Flux) {
    if (flux === activeFlux.value) {
      return
    }
    activeFlux.value = flux
    reactions.value = []
  }

  function clearActiveFlux() {
    activeFlux.value = null
  }

  const timelineEmpty = computed(() => !timeline.value || timeline.value.length === 0)

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
    profile,
    setProfile,
    clearProfile,
    hasProfile,
    timeline,
    setTimeline,
    clearTimeline,
    activeFlux,
    setActiveFlux,
    timelineEmpty,
    addToTimeline,
    clearActiveFlux,
    reactions,
    setReactions,
    addReply,
    clearReactions,
  }
})
