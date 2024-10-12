<template>
  <div class="flux-list">
    <h2>{{ listTitle }}</h2>
    <div v-if="loading" class="loading">Loading fluxes...</div>
    <div v-else-if="error" class="error">Error loading fluxes. Please try again.</div>
    <template v-else>
      <FluxItem v-for="flux in fluxStore.timeline" :key="flux.id" :flux="flux" @view-flux="handleView"
        @reply-to-flux="handleReply" @boost-flux="handleBoost" @view-profile="handleViewProfile" />
      <div v-if="fluxStore.timeline.length === 0" class="no-fluxes">No fluxes to display.</div>
    </template>
  </div>
</template>

<script setup>
import { useFluxes } from '~/composables/useFluxes'
import { useFluxStore } from '~/stores/flux'

const props = defineProps({
  userHandle: {
    type: String,
    default: null
  },
  trendy: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['select-flux', 'boost'])

const { loading, error, fetchFluxes } = useFluxes()
const fluxStore = useFluxStore()
const listTitle = ref('Fluxlines')

onMounted(() => {
  const options = {}
  if (props.userHandle) {
    options.author = props.userHandle
  }
  if (props.trendy) {
    options.filter = 'trendy'
  } else {
    options.filter = 'recent'
  }
  fetchFluxes(options)
})

watch(() => props.userHandle, (newUserHandle) => {
  if (newUserHandle) {
    listTitle.value = `${newUserHandle}'s Fluxes`
  } else {
    listTitle.value = 'The Latest Flux'
  }
  const options = {}
  if (props.userHandle) {
    options.author = props.userHandle
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

.loading,
.no-fluxes {
  padding: 20px;
  text-align: center;
  color: #657786;
}
</style>