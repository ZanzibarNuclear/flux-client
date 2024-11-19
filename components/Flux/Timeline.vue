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
        <UButton @click="handleLoadMore">Load more</UButton>
      </div>
      <div v-else>You have reached the end.</div>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  userHandle: {
    type: String,
    default: null
  },
  trendy: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['select-flux', 'boost'])

const { loading, error, fetchTimeline, currentContext } = useFluxService()
const fluxStore = useFluxStore()
const listTitle = ref('Fluxlines')

onMounted(() => {
  fetchTimeline(true)
})

watch(() => props.userHandle, (newUserHandle) => {
  if (newUserHandle) {
    listTitle.value = `${newUserHandle}'s Fluxes`
  } else {
    listTitle.value = 'The Latest Flux'
  }
  fetchAuthorFluxes(newUserHandle, true)
})

function handleLoadMore() {
  fetchTimeline(false)
}

function handleView(flux) {
  emit('viewFlux', flux)
}

function handleBoost(flux) {
  emit('boostFlux', flux)
}

function handleReply(flux) {
  emit('replyToFlux', flux)
}

function handleViewProfile(handle) {
  emit('viewProfile', handle)
}


function handleProfile(fluxId) {
  console.log('profile', fluxId)
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