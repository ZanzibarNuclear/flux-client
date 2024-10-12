<template>
  <div class="user-profile-page">
    <FluxUserProfile v-if="fluxUser" :flux-user="fluxUser" />
    <FluxTimeline v-if="userHandle" :user-handle="userHandle" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const userHandle = route.params.userHandle

const fluxStore = useFluxStore()
const fluxUser = ref(null)
const error = ref(null)

const fetchFluxUserByHandle = async (handle) => {
  try {
    const { data, error: fetchError } = await useSupabaseClient()
      .from('flux_users')
      .select('*')
      .eq('handle', handle)
      .single()
    if (fetchError) throw fetchError
    return data
  } catch (err) {
    console.error('Error fetching flux user by handle:', err)
    error.value = err
    return null
  }
}

watch(() => userHandle, async (newHandle) => {
  if (newHandle) {
    fluxUser.value = await fetchFluxUserByHandle(newHandle)
    if (fluxUser.value) {
      fluxStore.setFluxUser(fluxUser.value)
    }
  }
}, { immediate: true })

</script>

<style scoped>
.user-profile-page {
  max-width: 600px;
  margin: 0 auto;
}
</style>