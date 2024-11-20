<template>
  <Scroller :has-more="currentContext.hasMore" :loading-in-progress="loading" height-class="h-[calc(100vh-4rem)]"
    @load-more="loadMoreFluxes">
    <template #items>
      <FluxItem v-for="flux in fluxStore.timeline" :key="flux.id" :flux="flux" />
    </template>
  </Scroller>
</template>

<script lang="ts" setup>
const fluxStore = useFluxStore()
const { fetchTimeline, currentContext, loading } = useFluxService()

onMounted(async () => {
  await fetchTimeline(true)
})

watch(loading, (newVal) => {
  console.log('FluxService says isLoading=', newVal)
})

const loadMoreFluxes = async () => {
  await fetchTimeline()
}
</script>
