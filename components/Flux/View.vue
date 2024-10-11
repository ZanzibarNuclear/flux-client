<template>
  <div>
    <UButton icon="i-ph-arrow-left" label="Return to timeline" color="blue" variant="ghost" @click="returnToTimeline" />
    <div class="flux-view">
      <FluxItem :flux="flux" @reply="handleReply" />
      <div class="flux-reactions">
        <h3>Reactions</h3>
        <div v-if="loading">Loading...</div>
        <div v-else class="flux-reaction-chain">
          <FluxItem v-for="reaction in reactions" :key="reaction.id" :flux="reaction" @reply="handleReply" />
        </div>
        <div v-if="error">Error: {{ error }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useFluxes } from '@/composables/useFluxes'
import { useFluxStore } from '@/stores/flux'

const fluxStore = useFluxStore()

const { fluxes, loading, error, fetchReactions } = useFluxes()

const props = defineProps({
  flux: {
    type: Object,
    required: true
  },
})
const emit = defineEmits(['reply'])
const reactions = ref([])

onMounted(async () => {
  if (props.flux.id) {
    console.log('fetching reactions to', props.flux.id)
    fetchReactions(props.flux.id)
  }
})

watch(props.flux, async (newFlux) => {
  if (newFlux.id) {
    console.log('fetching reactions to', newFlux.id)
    fetchReactions(newFlux.id)
  }
})

watch(fluxes, async (newFluxes) => {
  console.log('fluxes', newFluxes)
  reactions.value = newFluxes
})

const handleReply = (flux) => {
  emit('reply', flux)
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
