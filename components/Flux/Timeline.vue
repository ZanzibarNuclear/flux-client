<template>
  <div class="flux-list">
    <h2>{{ listTitle }}</h2>
    <div v-if="loading" class="loading">Loading fluxes...</div>
    <div v-else-if="error" class="error">Error loading fluxes. Please try again.</div>
    <template v-else>
      <FluxItem v-for="flux in fluxes" :key="flux.id" :flux="flux" @view-flux="handleView" @reply-to-flux="handleReply"
        @boost-flux="handleBoost" @view-profile="handleViewProfile" />
      <div v-if="fluxes.length === 0" class="no-fluxes">No fluxes to display.</div>
    </template>
  </div>
</template>

<script setup>
import { useFluxes } from '~/composables/useFluxes'
import { useFluxStore } from '~/stores/flux'

const props = defineProps({
  username: {
    type: String,
    default: null
  },
  trendy: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['select-flux', 'boost'])

const { fluxes, loading, error, fetchFluxes } = useFluxes()
const fluxStore = useFluxStore()
const listTitle = ref('The Latest Flux')

onMounted(() => {
  const options = {}
  if (props.username) {
    options.author = props.username
  }
  if (props.trendy) {
    options.filter = 'trendy'
  } else {
    options.filter = 'recent'
  }
  fetchFluxes(options)
})

watch(() => props.username, (newUsername) => {
  if (newUsername) {
    listTitle.value = `${newUsername}'s Fluxes`
  } else {
    listTitle.value = 'The Latest Flux'
  }
  const options = {}
  if (props.username) {
    options.author = props.username
  }
  fetchFluxes(options)
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


function handleProfile(fluxId) {
  console.log('profile', fluxId)
}
</script>

<style scoped>
.flux-list {
  max-width: 600px;
  margin: 0 auto;
}

/* h2 {
  padding: 15px;
  border-bottom: 1px solid #e1e8ed;
} */

.loading,
.no-fluxes {
  padding: 20px;
  text-align: center;
  color: #657786;
}
</style>