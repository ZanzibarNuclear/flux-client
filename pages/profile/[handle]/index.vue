<template>
  <div class="user-profile-page pt-8">
    <FluxUserProfile v-if="fluxProfile" :flux-user="fluxProfile" />
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