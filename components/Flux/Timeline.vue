<template>
  <div class="divide-y divide-gray-200">
    <h2 class="text-center">{{ listTitle }}</h2>
    <div v-if="loading" class="loading">Loading fluxes...</div>
    <div v-else-if="error" class="error">Error loading fluxes. Please try again.</div>
    <template v-else>
      <FluxItem v-for="flux in fluxStore.timeline" :key="flux.id" :flux="flux" @view-flux="handleView"
        @reply-to-flux="handleReply" />
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
    console.log('fetching author fluxes for', props.profile.id)
    fetchAuthorFluxes(props.profile.id, true)
  } else {
    console.log('fetching timeline')
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
  console.log('timeline is viewing flux without composer', flux.id)
  if (props.profile) {
    navigateTo('/')
  }
}

function handleReply(flux: Flux) {
  console.log('timeline is viewing flux with composer', flux.id)
  if (props.profile) {
    navigateTo('/')
  }
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