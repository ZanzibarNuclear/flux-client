<template>
  <div class="home-timeline">
    <template v-if="fluxStore.activeFlux">
      <FluxComposer v-if="isReply" :replying-to="fluxStore.activeFlux" @cancel-reply="handleCancelReply" />
      <FluxView :flux="fluxStore.activeFlux" @reply-to-flux="handleReply" @boost-flux="handleBoost"
        @view-profile="handleViewProfile" @view-flux="handleViewFlux" />
    </template>
    <template v-else>
      <FluxComposer />
      <FluxTimeline @reply-to-flux="handleReply" @boost-flux="handleBoost" @view-profile="handleViewProfile"
        @view-flux="handleViewFlux" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Flux } from '@/utils/types'

const fluxService = useFluxService()
const fluxStore = useFluxStore()

const isReply = ref(false)

const handleCancelReply = () => {
  isReply.value = false
}

const handleViewFlux = (flux: Flux) => {
  isReply.value = false
  fluxStore.setActiveFlux(flux)
}

const handleViewProfile = (handle: string) => {
  navigateTo(`/profile/${handle}`)
}

const handleReply = (flux: Flux) => {
  isReply.value = true
  fluxStore.setActiveFlux(flux)
}

async function handleBoost(flux: Flux) {
  if (!fluxStore.hasProfile) {
    console.warn('Unknown user -- not able to boost')
    return
  }
  try {
    const boostedFlux = await fluxService.boostFlux(flux.id)
    if (boostedFlux) {
      fluxStore.updateFlux(boostedFlux as Flux)
    }
  } catch (error) {
    console.error('Error boosting flux:', error)
  }
}
</script>

<style scoped>
.home-timeline {
  max-width: 600px;
  margin: 1.0rem auto;
}
</style>