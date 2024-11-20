<template>
  <div>
    <UButton icon="i-ph-arrow-left" label="Return to timeline" color="blue" variant="ghost" @click="returnToTimeline" />
    <div class="flux-view">
      <FluxItem :flux="flux" @view-flux="handleView" @reply-to-flux="handleReply" />
      <div class="flux-reactions">
        <h3>Reactions</h3>
        <div v-if="error">Error: {{ error }}</div>
        <div v-else-if="loading">Loading...</div>
        <div v-else-if="fluxStore.reactions.length === 0">Be the first to react!</div>
        <div v-else class="flux-reaction-chain">
          <FluxItem v-for="reaction in fluxStore.reactions" :key="reaction.id" :flux="reaction" />
          <div v-if="currentContext.hasMore" class="load-more">
            <UButton @click="handleLoadMore">Load more</UButton>
          </div>
          <div v-else>You have reached the end.</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Flux } from '@/utils/types'

const fluxStore = useFluxStore()
const { loading, error, fetchReactions, currentContext } = useFluxService()

const props = defineProps({
  flux: {
    type: Object,
    required: true
  },
})

const load = async (fluxId: number) => {
  console.log('loading reactions to flux:', fluxId)
  await fetchReactions(fluxId, true)
}

onMounted(() => {
  console.log('FluxView.onMounted', props.flux)
  if (props.flux.id) {
    load(props.flux.id)
  }
})

watch(() => props.flux, (newFlux) => {
  console.log('flux changed:', newFlux)
  load(newFlux.id)
})

function handleLoadMore() {
  fetchReactions(props.flux.id, false)
}

const returnToTimeline = () => {
  fluxStore.clearActiveFlux()
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
