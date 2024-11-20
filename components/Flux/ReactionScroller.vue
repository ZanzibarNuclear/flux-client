<template>
  <Scroller :has-more="currentContext.hasMore" :loading-in-progress="loading" height-class="h-[calc(100vh-4rem)]"
    @load-more="loadMoreFluxes" no-more-message="What's your reaction?">
    <template #items>
      <h3 class="text-center">Reactions</h3>
      <FluxItem v-for="flux in fluxStore.reactions" :key="flux.id" :flux="flux" @view-flux="handleView"
        @reply-to-flux="handleReply" />
    </template>
  </Scroller>
</template>

<script lang="ts" setup>
const fluxStore = useFluxStore()
const { fetchReactions, currentContext, loading } = useFluxService()

const fluxId = computed(() => fluxStore.activeFlux?.id)

onMounted(async () => {
  console.log(`ReactionScroller.onMounted, fluxId=${fluxId.value}`)
  if (fluxId.value) {
    await fetchReactions(fluxId.value, true)
  } else {
    console.error('no active flux to fetch reactions for')
  }
})

const loadMoreFluxes = async () => {
  if (fluxId.value) {
    await fetchReactions(fluxId.value)
  } else {
    console.error('no active flux to fetch reactions for')
  }
}

function handleView(flux: Flux) {
  navigateTo('/')
}

function handleReply(flux: Flux) {
  navigateTo('/')
}

</script>
