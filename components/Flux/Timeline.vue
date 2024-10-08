<template>
  <div class="flux-list">
    <h2>{{ listTitle }}</h2>
    <div v-if="loading" class="loading">Loading fluxes...</div>
    <div v-else-if="error" class="error">Error loading fluxes. Please try again.</div>
    <template v-else>
      <FluxItem v-for="flux in fluxes" :key="flux.id" :flux="flux" />
      <div v-if="fluxes.length === 0" class="no-fluxes">No fluxes to display.</div>
    </template>
  </div>
</template>

<script setup>
import { useFluxes } from '~/composables/useFluxes'

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

const { fluxes, loading, error, fetchFluxes } = useFluxes()
const listTitle = ref('Flux Timeline')

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
  fetchFluxes()
})
</script>

<style scoped>
.flux-list {
  max-width: 600px;
  margin: 0 auto;
}

h2 {
  padding: 15px;
  border-bottom: 1px solid #e1e8ed;
}

.loading,
.no-fluxes {
  padding: 20px;
  text-align: center;
  color: #657786;
}
</style>