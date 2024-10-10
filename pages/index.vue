<template>
  <div class="home-timeline">
    <template v-if="fluxStore.activeFlux">
      <FluxComposer v-if="isReply" :replying-to="fluxStore.activeFlux" @posted="handlePosted"
        @reply-posted="handleReplyPosted" />
      <FluxView :flux="fluxStore.activeFlux" @reply="handleReply" />
    </template>
    <template v-else>
      <FluxComposer @posted="handlePosted" @reply-posted="handleReplyPosted" />
      <FluxTimeline @select-flux="handleSelectFlux" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Flux } from '@/utils/types'
import { useFluxStore } from '@/stores/flux'
const fluxStore = useFluxStore()
const isReply = ref(false)

const handleSelectFlux = (flux: Flux) => {
  console.log('show selected flux', flux)
  fluxStore.setActiveFlux(flux)
}

const handleReply = (flux: Flux) => {
  fluxStore.setActiveFlux(flux)
  isReply.value = true
}

const handlePosted = (flux: Flux) => {
  console.log('posted', flux)
}

const handleReplyPosted = (flux: Flux) => {
  console.log('reply posted', flux)
}
</script>

<style scoped>
.home-timeline {
  max-width: 600px;
  margin: 1.0rem auto;
}
</style>