<template>
  <div>
    <UButton icon="i-ph-arrow-left" label="Return to timeline" color="blue" variant="ghost" @click="returnToTimeline" />
    <div class="flux-view">
      <FluxItem :flux="flux" @view-flux="handleView" @reply-to-flux="handleReply" />
      <FluxReactionScroller />
    </div>
  </div>
</template>

<script setup lang="ts">
const fluxStore = useFluxStore()

defineProps({
  flux: {
    type: Object,
    required: true
  },
})

const returnToTimeline = () => {
  fluxStore.clearActiveFlux()
  navigateTo('/')
}

const handleView = () => {
  navigateTo('/')
}

const handleReply = () => {
  navigateTo('/')
}
</script>

<style scoped>
.flux-view {
  padding: 1rem;
  border: 1px solid theme('colors[nuclear-blue]300');
  border-radius: 8px;
  margin-bottom: 1rem;
}

.flux-details {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.flux-info {
  margin-left: 1rem;
}

.author-name {
  font-weight: bold;
}

.author-username,
.flux-time {
  color: #6b7280;
}

.flux-content {
  margin-bottom: 1rem;
}

.flux-reactions {
  margin-top: 1rem;
  border-top: 5px solid theme('colors[nuclear-blue]300');
  padding-top: 1rem;
}
</style>
