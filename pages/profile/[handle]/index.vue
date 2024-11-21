<template>
  <div class="user-profile-page pt-8">
    <div v-if="fluxProfile">
      <FluxUserProfile :flux-user="fluxProfile" />
      <FluxByAuthorScroller :author="fluxProfile" class="mt-8" />
    </div>
    <div v-else>
      <h2>No profile found for {{ handle }}</h2>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import type { FluxProfile } from '@/utils/types'

const fluxService = useFluxService()
const route = useRoute()
const handle = ref(route.params.handle)

const fluxProfile = ref<FluxProfile | null>(null)

onMounted(async () => {
  if (handle.value) {
    fluxProfile.value = await fluxService.fetchFluxProfile(handle.value as string)
  }
})
</script>

<style scoped>
.user-profile-page {
  max-width: 600px;
  margin: 0 auto;
}
</style>