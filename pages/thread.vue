<template>
  <div>
    <div v-if="!fluxStore.showThread">
      <FluxTimeline :fluxes="fluxStore.fluxes" />
    </div>
    <FluxThread v-else :thread-id="fluxStore.currentThreadId" />
  </div>
</template>

<script setup>
import { useFluxStore } from '~/stores/fluxStore'

const fluxStore = useFluxStore()
const { fluxes, loading, error, fetchFluxes } = useFluxes()

onMounted(async () => {
  // Fetch fluxes from the API and update the store
  const result = await fetchFluxes()
  fluxStore.setFluxes(result.fluxes)
})
</script>