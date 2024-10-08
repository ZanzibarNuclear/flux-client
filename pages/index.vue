<template>
  <div class="home-timeline">
    <FluxComposer />
    <FluxView v-if="selectedFlux" :flux="selectedFlux" />
    <FluxTimeline v-else @select-flux="handleFluxSelect" />
  </div>
</template>

<script setup lang="ts">
import type { Flux } from '@/utils/types'

const selectedFlux = ref<Flux | null>(null)

const handleFluxSelect = (flux: Flux) => {
  console.log('show selected flux', flux)
  selectedFlux.value = flux
}
</script>

<style scoped>
.home-timeline {
  max-width: 600px;
  margin: 1.0rem auto;
}
</style>