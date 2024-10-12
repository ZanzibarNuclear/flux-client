<template>
  <div class="home-timeline">
    <template v-if="fluxStore.activeFlux">
      <FluxComposer v-if="isReply" :replying-to="fluxStore.activeFlux" />
      <FluxView :flux="fluxStore.activeFlux" @reply-to-flux="handleReply" @boost-flux="handleBoost"
        @view-profile="handleViewProfile" @view-flux="handleViewFlux" />
    </template>
    <template v-else>
      <FluxComposer />
      <FluxTimeline @reply-to-flux="handleReply" @boost-flux="handleBoost" @view-profile="handleViewProfile"
        @view-flux="handleViewFlux" />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Flux, FluxUser } from '@/utils/types' // Add FluxAuthor type
import { useFluxStore } from '@/stores/flux'

const fluxStore = useFluxStore()
const user = useSupabaseUser()

const isReply = ref(false)

const fetchFluxUser = async (userId: string): Promise<FluxUser | null> => {
  const { data } = await useSupabaseClient()
    .from('flux_users')
    .select('*')
    .eq('user_id', userId)
    .single()
  return data
}

// Use useAsyncData to handle the author fetching
const { data: fluxUser, error } = await useAsyncData(
  'fluxUser',
  async () => user.value ? await fetchFluxUser(user.value.id) : null,
  { watch: [user] }
)

// Watch for changes in the flux user data
watch(fluxUser, (newFluxUser) => {
  if (newFluxUser) {
    fluxStore.setFluxUser(newFluxUser)
  }
}, { immediate: true })

// Handle error if author fetch fails
watchEffect(() => {
  if (error.value) {
    console.error('Error fetching flux user:', error.value)
    // TODO: Handle the error appropriately (e.g., show a notification to the user)
  }
})

const handleViewFlux = (flux: Flux) => {
  isReply.value = false
  fluxStore.setActiveFlux(flux)
}

const handleViewProfile = (handle: string) => {
  navigateTo(`/profile/${handle}`)
}

const handleReply = (flux: Flux) => {
  isReply.value = true
  fluxStore.setActiveFlux(flux)
}

async function handleBoost(flux: Flux) {
  const fluxUser = fluxStore.fluxUser
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
  console.log(response) // TODO: update locally
  if (response.success) {
    flux.boostCount = response.boostCount
  }
}
</script>

<style scoped>
.home-timeline {
  max-width: 600px;
  margin: 1.0rem auto;
}
</style>