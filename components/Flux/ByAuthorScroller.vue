<template>
  <Scroller :has-more="currentContext.hasMore" :loading-in-progress="loading" height-class="h-[calc(100vh-4rem)]"
    @load-more="loadMoreFluxes">
    <template #items>
      <h3 class="text-center">Fluxes by {{ props.author.displayName }}</h3>
      <FluxItem v-for="flux in fluxStore.timeline" :key="flux.id" :flux="flux" @view-flux="handleView"
        @reply-to-flux="handleReply" />
    </template>
  </Scroller>
</template>

<script lang="ts" setup>
const props = defineProps({
  author: {
    type: Object,
    required: true
  }
})
const fluxStore = useFluxStore()
const { fetchAuthorFluxes, currentContext, loading } = useFluxService()

onMounted(async () => {
  await fetchAuthorFluxes(props.author.id, true)
})

const loadMoreFluxes = async () => {
  await fetchAuthorFluxes(props.author.id)
}

function handleView(flux: Flux) {
  navigateTo('/')
}

function handleReply(flux: Flux) {
  navigateTo('/')
}

</script>
