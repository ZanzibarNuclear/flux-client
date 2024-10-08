<template>
  <div class="home-timeline">
    <FluxView v-if="fluxStore.activeFlux" :flux="fluxStore.activeFlux" />
    <template v-else>
      <FluxComposer />
      <FluxTimeline @select-flux="handleSelectFlux" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Flux } from '@/utils/types'
import { useFluxStore } from '@/stores/flux'
const fluxStore = useFluxStore()

const handleSelectFlux = (flux: Flux) => {
  console.log('show selected flux', flux)
  fluxStore.setActiveFlux(flux)
}
</script>

<style scoped>
.home-timeline {
  max-width: 600px;
  margin: 1.0rem auto;
}
</style>