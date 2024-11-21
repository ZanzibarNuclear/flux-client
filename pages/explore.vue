<template>
  <div class="explore-page">
    <FluxSearch @search="performSearch" class="py-6" />
    <div v-if="loading" class="loading">Searching for Fluxes...</div>
    <div v-else-if="searchPerformed && fluxes.length === 0" class="no-results">
      No Fluxes found for "{{ lastSearchQuery }}".
    </div>
    <template v-else>
      <h3 class="text-center">{{ searchPerformed ? 'Search Results' : 'Trending Fluxes' }}</h3>
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