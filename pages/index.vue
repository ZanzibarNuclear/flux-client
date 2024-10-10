<template>
  <div class="home-timeline">
    <template v-if="fluxStore.activeFlux">
      <FluxComposer v-if="isReply" :replying-to="fluxStore.activeFlux" @posted="handlePosted"
        @reply-posted="handleReplyPosted" />
      <FluxView :flux="fluxStore.activeFlux" @reply="handleReply" />
    </template>
    <template v-else>
      <FluxComposer @posted="handlePosted" @reply-posted="handleReplyPosted" />
      <FluxTimeline @select-flux="handleSelectFlux" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Flux, FluxAuthor } from '@/utils/types' // Add FluxAuthor type
import { useFluxStore } from '@/stores/flux'

const fluxStore = useFluxStore()
const user = useSupabaseUser()
const isReply = ref(false)

// Add this function to fetch the author from the database
const fetchAuthor = async (userId: string): Promise<FluxAuthor | null> => {
  // Implement your database query here
  // For example:
  const { data } = await useSupabaseClient()
    .from('flux_authors')
    .select('*')
    .eq('user_id', userId)
    .single()
  return data
}

// Use useAsyncData to handle the author fetching
const { data: author, error } = await useAsyncData(
  'author',
  async () => user.value ? await fetchAuthor(user.value.id) : null,
  { watch: [user] }
)

// Watch for changes in the author data
watch(author, (newAuthor) => {
  if (newAuthor) {
    fluxStore.setActiveAuthor(newAuthor)
  }
}, { immediate: true })

// Handle error if author fetch fails
watchEffect(() => {
  if (error.value) {
    console.error('Error fetching author:', error.value)
    // Handle the error appropriately (e.g., show a notification to the user)
  }
})

const handleSelectFlux = (flux: Flux) => {
  console.log('show selected flux', flux)
  fluxStore.setActiveFlux(flux)
}

const handleReply = (flux: Flux) => {
  fluxStore.setActiveFlux(flux)
  isReply.value = true
}

const handlePosted = (flux: Flux) => {
  console.log('posted', flux)
}

const handleReplyPosted = (flux: Flux) => {
  console.log('reply posted', flux)
}
</script>

<style scoped>
.home-timeline {
  max-width: 600px;
  margin: 1.0rem auto;
}
</style>