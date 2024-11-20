<template>
  <div ref="scrollContainer" class="h-[calc(100vh-4rem)] overflow-y-auto" @scroll="handleScroll">
    <slot name="items" />
    <div v-if="isLoading" class="py-4 text-center">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin" />
      Loading more...
    </div>

    <div v-else-if="noMoreItems" class="py-4 text-center text-gray-500">
      No more items to load
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core'

const props = defineProps<{
  // If true, indicates there are more items that can be loaded
  hasMore: boolean
}>()

const emit = defineEmits<{
  'load-more': []
}>()

const scrollContainer = ref<HTMLElement | null>(null)
const isLoading = ref(false)
const noMoreItems = computed(() => !props.hasMore && !isLoading.value)

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
  if (isLoading.value) return

  isLoading.value = true
  emit('load-more')

  // Reset loading after a short delay
  // In real usage, you'd want to have the parent component signal when loading is complete
  setTimeout(() => {
    isLoading.value = false
  }, 1000)
}
</script>

<style scoped></style>