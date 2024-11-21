<template>
  <div class="explore-page">
    <h2>See popular fluxes</h2>
    <FluxSearch @search="performSearch" />
    <div v-if="loading" class="loading">Searching for Fluxes...</div>
    <div v-else-if="searchPerformed && fluxes.length === 0" class="no-results">
      No Fluxes found for "{{ lastSearchQuery }}".
    </div>
    <template v-else>
      <h2>{{ searchPerformed ? 'Search Results' : 'Trending Fluxes' }}</h2>
      <FluxTimelineScroller trendy />
    </template>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
})

const fluxes = ref([])
const loading = ref(false)
const searchPerformed = ref(false)
const lastSearchQuery = ref('')

async function performSearch(query) {
  loading.value = true
  lastSearchQuery.value = query
  searchPerformed.value = true

  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Mock search results
  fluxes.value = Array.from({ length: 5 }, (_, i) => ({
    id: Date.now() + i,
    author: `User ${i + 1}`,
    authorUsername: `user${i + 1}`,
    authorAvatar: `https://api.dicebear.com/6.x/initials/svg?seed=User${i + 1}`,
    content: `This is a sample flux containing "${query}". #Flux #${query.replace(/\s+/g, '')}`,
    timestamp: new Date(Date.now() - i * 60000).toISOString(),
    replyCount: Math.floor(Math.random() * 10),
    amplifyCount: Math.floor(Math.random() * 50),
    energizeCount: Math.floor(Math.random() * 100),
    amplified: Math.random() > 0.5,
    energized: Math.random() > 0.5
  }))

  loading.value = false
}
</script>

<style scoped>
.explore-page {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 20px;
}

.loading,
.no-results {
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #657786;
}
</style>