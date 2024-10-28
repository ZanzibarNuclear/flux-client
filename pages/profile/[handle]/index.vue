<template>
  <div class="user-profile-page">
    <FluxUserProfile v-if="fluxProfile" :flux-user="fluxProfile" />
    <p v-if="isCurrentUser">This is you!</p>
    <FluxTimeline v-if="handle" :user-handle="handle" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const fluxService = useFluxService()
const fluxStore = useFluxStore()

const route = useRoute()
const handle = ref(route.params.handle)

const fluxProfile = ref(null)
const isCurrentUser = computed(() => fluxProfile.value?.handle === fluxStore.profile?.handle)

onMounted(async () => {
  if (handle.value) {
    fluxProfile.value = await fluxService.fetchFluxProfile(handle.value)
  }
})
</script>

<style scoped>
.user-profile-page {
  max-width: 600px;
  margin: 0 auto;
}
</style>