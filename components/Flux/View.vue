<template>
  <div>
    <UButton icon="i-ph-arrow-left" label="Return to timeline" color="blue" variant="ghost" @click="returnToTimeline" />
    <div class="flux-view">
      <FluxItem :flux="flux" @reply-to-flux="handleReply" @boost-flux="handleBoost" @view-flux="handleView"
        @view-profile="handleViewProfile" />
      <div class="flux-reactions">
        <h3>Reactions</h3>
        <div v-if="loading">Loading...</div>
        <div v-else class="flux-reaction-chain">
          <FluxItem v-for="reaction in fluxStore.reactions" :key="reaction.id" :flux="reaction"
            @reply-to-flux="handleReply" @boost-flux="handleBoost" @view-flux="handleView"
            @view-profile="handleViewProfile" />
        </div>
        <div v-if="error">Error: {{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFluxService } from '@/composables/useFluxService'
import { useFluxStore } from '@/stores/flux'

const fluxStore = useFluxStore()
const { loading, error, fetchReactions } = useFluxService()

const props = defineProps({
  flux: {
    type: Object,
    required: true
  },
})
// TODO: get reactions from flux store

const emit = defineEmits(['replyToFlux', 'viewFlux', 'boostFlux', 'viewProfile'])

const load = (fluxId) => {
  console.log('loading reactions to flux:', fluxId)
  fetchReactions(fluxId)
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

function handleView(flux) {
  emit('viewFlux', flux)
}

function handleBoost(flux) {
  emit('boostFlux', flux)
}

function handleReply(flux) {
  emit('replyToFlux', flux)
}

function handleViewProfile(handle) {
  emit('viewProfile', handle)
}

const returnToTimeline = () => {
  fluxStore.clearActiveFlux()
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
  border-top: 1px solid theme('colors[nuclear-blue]300');
  padding-top: 1rem;
}
</style>
