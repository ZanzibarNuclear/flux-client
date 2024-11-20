<template>
  <div ref="scrollContainer" class="scroller overflow-y-auto" @scroll="handleScroll">
    <div ref="contentWrapper">
      <slot name="items" />

      <div v-if="isLoading" class="py-4 text-center">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin" />
        Loading more...
      </div>

      <div v-else-if="noMoreItems" class="py-4 text-center text-gray-500">
        {{ noMoreMessage || 'The End' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core'

const props = defineProps<{
  hasMore: boolean
  loadingInProgress: boolean
  noMoreMessage?: string
}>()

const emit = defineEmits<{
  'load-more': []
}>()

const scrollContainer = ref<HTMLElement | null>(null)
const contentWrapper = ref<HTMLElement | null>(null)
const isLoading = ref(false)
const noMoreItems = computed(() => !props.hasMore && !isLoading.value)

// Check if we need to load more content
function checkContentHeight() {
  if (!scrollContainer.value || !contentWrapper.value) return

  const containerHeight = scrollContainer.value.clientHeight
  const contentHeight = contentWrapper.value.clientHeight

  // If content doesn't fill the container and we have more items to load
  if (contentHeight < containerHeight && props.hasMore && !isLoading.value) {
    loadMore()
  }
}

// Debounced scroll handler
const handleScroll = useDebounceFn((event: Event) => {
  if (!scrollContainer.value || isLoading.value || !props.hasMore) return

  const container = scrollContainer.value
  const scrollBottom = container.scrollHeight - container.scrollTop - container.clientHeight

  // If we're within 100px of the bottom, load more
  if (scrollBottom < 100) {
    loadMore()
  }
}, 100)

async function loadMore() {
  console.log(`I say isLoading=${isLoading.value} and prop saysloadingInProgress=${props.loadingInProgress}`)
  if (isLoading.value) return

  isLoading.value = true
  emit('load-more')

  // Reset loading after a short delay
  // In real usage, you'd want to have the parent component signal when loading is complete
  setTimeout(() => {
    isLoading.value = false
    nextTick(() => {
      checkContentHeight()
    })
  }, 1000)
}

onMounted(() => {
  checkContentHeight()
})

watch(() => props.hasMore, () => {
  nextTick(() => {
    checkContentHeight()
  })
})
</script>

<style scoped>
.scroller {
  /* This will position the scroller between header and footer */
  height: calc(90vh - var(--header-height, 4rem) - var(--footer-height, 4rem) - var(--page-title-height, 3rem));
  /* Remove fixed positioning, let the parent control layout */
  width: 100%;
}
</style>