<template>
  <div class="divide-y divide-gray-200">
    <h2 class="text-center">{{ listTitle }}</h2>
    <div v-if="loading" class="loading">Loading fluxes...</div>
    <div v-else-if="error" class="error">Error loading fluxes. Please try again.</div>
    <template v-else>
      <FluxItem v-for="flux in fluxStore.timeline" :key="flux.id" :flux="flux" @view-flux="handleView"
        @reply-to-flux="handleReply" @boost-flux="handleBoost" @view-profile="handleViewProfile" />
      <div v-if="fluxStore.timelineEmpty" class="no-fluxes">No fluxes to display.</div>
      <div v-if="currentContext.hasMore" class="load-more">
        <UButton @click="loadMore">Load more</UButton>
      </div>
      <div v-else>You have reached the end.</div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { Flux } from '@/utils/types'

const props = defineProps({
  profile: {
    type: Object,
    default: null
  },
  trendy: {
    type: Boolean,
    default: false
  }
})

const { loading, error, fetchTimeline, fetchAuthorFluxes, currentContext } = useFluxService()
const fluxStore = useFluxStore()
const listTitle = ref('Fluxlines')
const forProfile = computed(() => props.profile !== null)

onMounted(() => {
  if (forProfile.value) {
    fetchAuthorFluxes(props.profile.id, true)
  } else {
    fetchTimeline(true)
  }
})

function loadMore() {
  if (forProfile.value) {
    fetchAuthorFluxes(props.profile.id, false)
  } else {
    fetchTimeline(false)
  }
}

function handleView(flux: Flux) {
  fluxStore.setActiveFlux(flux, false)
}

function handleReply(flux: Flux) {
  fluxStore.setActiveFlux(flux, true)
}

async function handleBoost(flux: Flux) {
  if (!fluxStore.hasProfile) {
    console.warn('Unknown user -- not able to boost')
    return
  }
  try {
    const boostedFlux = await useFluxService().boostFlux(flux.id)
    if (boostedFlux) {
      fluxStore.updateFlux(boostedFlux as Flux)
    }
  } catch (error) {
    console.error('Error boosting flux:', error)
  }
}

function handleViewProfile(handle: string) {
  navigateTo(`/profile/${handle}`)
}
</script>

<style scoped>
.flux-list {
  max-width: 600px;
  margin: 0 auto;
}

.loading,
.no-fluxes {
  padding: 20px;
  text-align: center;
  color: #657786;
}
</style>