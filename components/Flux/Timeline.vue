<template>
  <div class="flux-list">
    <h3>{{ listTitle }}</h3>
    <div v-if="loading" class="loading">Loading fluxes...</div>
    <div v-else-if="error" class="error">Error loading fluxes. Please try again.</div>
    <template v-else>
      <FluxItem v-for="flux in fluxes" :key="flux.id" :flux="flux" @seeThread="handleFluxSelect" @reply="handleReply"
        @boost="handleBoost" @profile="handleProfile" />
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
const emit = defineEmits(['select-flux'])

const { fluxes, loading, error, fetchFluxes } = useFluxes()
const fluxStore = useFluxStore()
const listTitle = ref('Timeline')

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
    listTitle.value = 'Flux Timeline'
  }
  const options = {}
  if (props.username) {
    options.author = props.username
  }
  fetchFluxes(options)
})

const handleFluxSelect = (flux) => {
  console.log('bubble up selected flux', flux)
  emit('select-flux', flux)
}

function handleReply(fluxId) {
  console.log('reply', fluxId)
}

function handleBoost(fluxId) {
  console.log('boost', fluxId)
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