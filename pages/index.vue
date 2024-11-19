<template>
  <div class="pb-28">
    <template v-if="fluxStore.activeFlux">
      <FluxComposer v-if="isReply" :replying-to="fluxStore.activeFlux" @cancel-reply="handleCancelReply" />
      <FluxView :flux="fluxStore.activeFlux" @reply-to-flux="handleReply" @boost-flux="handleBoost"
        @view-flux="handleViewFlux" />
    </template>
    <template v-else>
      <div class="py-8">
        <FluxComposer v-if="fluxStore.hasProfile" />
        <div v-else>
          <NuxtImg src="/images/flux-theme-v1.jpg" class="mx-auto" />
          <NuxtLink to="/join" class="block text-center text-lg text-[nuclear-blue]">Sign in to participate.</NuxtLink>
        </div>
        <hr />
      </div>
      <FluxTimeline />
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

<style scoped></style>