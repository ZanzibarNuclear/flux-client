<template>
  <div class="user-profile-page">
    <FluxUserProfile v-if="fluxProfile" :flux-user="fluxProfile" />
    <FluxTimeline v-if="fluxProfile.handle" :user-handle="fluxProfile.handle" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const handle = route.params.handle

const fluxService = useFluxService()
const fluxProfile = ref(null)

watch(() => handle, async (newHandle) => {
  if (newHandle) {
    fluxProfile.value = await fluxService.fetchFluxProfile(handle)
  }
}, { immediate: true })

</script>

<style scoped>
.user-profile-page {
  max-width: 600px;
  margin: 0 auto;
}
</style>