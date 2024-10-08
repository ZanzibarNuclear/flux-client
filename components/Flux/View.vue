<template>
  <div class="flux-view">
    <div class="flux-details">
      <UAvatar :src="flux.authorAvatar" :alt="flux.author" />
      <div class="flux-info">
        <span class="author-name">{{ flux.author }}</span>
        <span class="author-username">@{{ flux.authorUsername }}</span>
        <span class="flux-time"> - {{ formatTimeAgo(flux.timestamp) }}</span>
      </div>
    </div>
    <div class="flux-content">
      <p>{{ flux.content }}</p>
    </div>
    <div class="flux-reactions">
      <h3>(Chain) Reactions</h3>
      <div v-if="loading">Loading...</div>
      <div v-else class="flux-reaction-chain">
        <FluxItem v-for="reaction in reactions" :key="reaction.id" :flux="reaction" />
      </div>
      <div v-if="error">Error: {{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { formatTimeAgo } from '@/utils/dateUtils'
import { useFluxes } from '@/composables/useFluxes'

const { fluxes, loading, error, fetchReactions } = useFluxes()

const props = defineProps({
  flux: {
    type: Object,
    required: true
  },
})
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
</script>

<style scoped>
.flux-view {
  padding: 1rem;
  border: 1px solid #e5e7eb;
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
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
}
</style>
