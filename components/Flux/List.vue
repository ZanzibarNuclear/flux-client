<template>
  <div class="flux-list">
    <h2>{{ listTitle }}</h2>
    <FluxItem v-for="flux in fluxes" :key="flux.id" :flux="flux" />
    <div v-if="loading" class="loading">Loading more fluxes...</div>
    <div v-if="!loading && fluxes.length === 0" class="no-fluxes">No fluxes to display.</div>
  </div>
</template>

<script setup>
const props = defineProps({
  username: {
    type: String,
    default: null
  },
  fluxes: {
    type: Array,
    default: () => []
  }
})

const fluxes = ref([])
const loading = ref(false)
const listTitle = ref('Flux Timeline')

// Mock function to fetch fluxes
async function fetchFluxes() {
  if (props.fluxes.length > 0) {
    fluxes.value = props.fluxes
    return
  }

  loading.value = true
  // Simulate API call
  // await new Promise(resolve => setTimeout(resolve, 1000))

  // Generate mock data
  const mockFluxes = Array.from({ length: 10 }, (_, i) => ({
    id: Date.now() + i,
    author: `User ${i + 1}`,
    authorUsername: `user${i + 1}`,
    authorAvatar: `https://api.dicebear.com/6.x/initials/svg?seed=User${i + 1}`,
    content: `This is a sample flux ${i + 1}. #Flux`,
    timestamp: new Date(Date.now() - i * 60000).toISOString(),
    replyCount: Math.floor(Math.random() * 10),
    amplifyCount: Math.floor(Math.random() * 50),
    boostCount: Math.floor(Math.random() * 100),
    amplified: Math.random() > 0.5,
    boosted: Math.random() > 0.5
  }))

  fluxes.value = mockFluxes
  loading.value = false
}

onMounted(() => {
  fetchFluxes()
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