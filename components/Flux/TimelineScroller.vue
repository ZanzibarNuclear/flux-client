<template>
  <Scroller :has-more="currentContext.hasMore" :loading-in-progress="loading" @load-more="loadMoreFluxes">
    <template #items>
      <h3 class="text-center">Fluxlines</h3>
      <FluxItem v-for="flux in fluxStore.timeline" :key="flux.id" :flux="flux" @view-flux="handleView"
        @reply-to-flux="handleReply" />
    </template>
  </Scroller>
</template>

<script lang="ts" setup>
const fluxStore = useFluxStore()
const { fetchTimeline, fetchTrending, currentContext, loading } = useFluxService()
const props = defineProps<{
  trendy?: boolean
}>()

onMounted(async () => {
  if (props.trendy) {
    await fetchTrending(true)
  } else {
    await fetchTimeline(true)
  }
})

const loadMoreFluxes = async () => {
  if (props.trendy) {
    await fetchTrending()
  } else {
    await fetchTimeline()
  }
}

function handleView(flux: Flux) {
  navigateTo('/')
}

function handleReply(flux: Flux) {
  navigateTo('/')
}

</script>
