<template>
  <h2>Timeline Scroller</h2>
  <Scroller :has-more="currentContext.hasMore" @load-more="loadMoreFluxes">
    <template #items>
      <FluxItem v-for="flux in fluxStore.timeline" :key="flux.id" :flux="flux" />
    </template>
  </Scroller>
</template>

<script lang="ts" setup>
const fluxStore = useFluxStore()

const { fetchTimeline, currentContext } = useFluxService()

onMounted(async () => {
  console.log('timeline scroller mounted')
  await fetchTimeline(true)
  console.log('we got some fluxes', fluxStore.timeline.length)
})

const loadMoreFluxes = async () => {
  await fetchTimeline()
}
</script>
