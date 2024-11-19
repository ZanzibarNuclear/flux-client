<template>
  <div class="user-profile-page">
    <FluxUserProfile v-if="fluxProfile" :flux-user="fluxProfile" />
    <FluxTimeline v-if="handle" :user-handle="handle" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const fluxService = useFluxService()

const route = useRoute()
const handle = ref(route.params.handle)

const fluxProfile = ref(null)

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