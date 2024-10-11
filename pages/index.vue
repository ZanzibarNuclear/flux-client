<template>
  <div class="home-timeline">
    <template v-if="fluxStore.activeFlux">
      <FluxComposer v-if="isReply" :replying-to="fluxStore.activeFlux" @posted="handlePosted"
        @reply-posted="handleReplyPosted" />
      <FluxView :flux="fluxStore.activeFlux" @reply-to-flux="handleReply" @boost-flux="handleBoost"
        @view-profile="handleViewProfile" @view-flux="handleViewFlux" />
    </template>
    <template v-else>
      <FluxComposer @posted="handlePosted" @reply-posted="handleReplyPosted" />
      <FluxTimeline @reply-to-flux="handleReply" @boost-flux="handleBoost" @view-profile="handleViewProfile"
        @view-flux="handleViewFlux" />
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

const handleViewFlux = (flux: Flux) => {
  console.log('show selected flux', flux)
  fluxStore.setActiveFlux(flux)
}

const handleViewProfile = (handle: string) => {
  console.log('show profile', handle)
}

const handleReply = (flux: Flux) => {
  fluxStore.setActiveFlux(flux)
  isReply.value = true
}

async function handleBoost(flux: Flux) {
  const fluxUser = fluxStore.activeAuthor
  if (!fluxUser) {
    console.warn('Unknown user -- not able to boost')
    return
  }
  const response = await $fetch(`/api/fluxes/${flux.id}/boost`, {
    method: 'POST',
    body: { fluxUserId: fluxUser.id },
    headers: {
      'Content-Type': 'application/json'
    }
  })

  console.log(response)
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