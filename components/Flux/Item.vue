<template>
  <article class="p-4 bg-white">
    <div class="flex gap-3">
      <UAvatar @click="handleViewProfile" class="w-10 h-10 flex-shrink-0" :src="flux.author?.avatar"
        :alt="flux.author?.display_name || '?? User'" />
      <div class="flex-1">
        <div class="flex items-center gap-2">
          <span @click="handleViewProfile" class="font-bold">{{ flux.author?.display_name }}</span>
          <span @click="handleViewProfile" class="text-gray-500">@{{ flux.author?.handle }}</span>
          <span class="text-gray-500">· {{ formatTimeAgo(flux.created_at) }}</span>
          <UButton class="ml-auto" @click="handleReply" icon="i-ph-arrow-bend-up-left-duotone" label="React"
            color="blue" variant="ghost" />
        </div>
        <div @click="handleView" class="mt-1">
          <div class="rich-text" v-html="flux.content" />
        </div>
        <div class="flex justify-between mt-3 text-gray-500 flux-actions">
          <UButton @click="handleReply" icon="i-ph-chat-circle-text" color="gray" variant="ghost">
            {{ flux.reply_count }} Reactions
            <Icon v-if="flux.replied" name="i-ph-star" />
          </UButton>
          <UButton @click="handleBoost" icon="i-ph-lightning" color="blue" :variant="flux.boosted ? 'solid' : 'ghost'">
            {{ flux.boost_count }} Boosts
          </UButton>
          <UButton @click="handleView" icon="i-ph-eye" label="View" color="gray" variant="ghost">
            {{ flux.view_count }} Views
          </UButton>
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { formatTimeAgo } from '@/utils/dateUtils';

const props = defineProps({
  flux: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['viewFlux', 'replyToFlux'])

function handleView() {
  console.log('viewing', props.flux.id)
  useFluxStore().setActiveFlux(props.flux as Flux)
  emit('viewFlux', props.flux)
}

function handleReply() {
  console.log('replying to', props.flux.id)
  useFluxStore().setActiveFlux(props.flux as Flux, true)
  emit('replyToFlux', props.flux)
}

const handleBoost = async () => {
  console.log('boosting', props.flux.id)
  await useFluxService().boostFlux(props.flux.id)
}

function handleViewProfile() {
  const handle = props.flux.author?.handle
  if (!handle) {
    console.error('no handle to view profile')
    return
  }
  navigateTo(`/profile/${handle}`)
}
</script>

<style scoped>
.flux-actions {
  background-color: theme('colors[nuclear-blue]50');
  border: 1px solid theme('colors[nuclear-blue]300');
}

.clickable {
  cursor: pointer;
}

.rich-text :deep(p) {
  margin: 0.75rem 0;
}

.rich-text :deep(ul) {
  margin: 1rem 1rem 0 1rem;
  list-style: disc;
}

.rich-text :deep(ol) {
  margin: 1rem 1rem 0 1rem;
  list-style: decimal;
}

.rich-text :deep(blockquote) {
  margin-left: 1rem;
  border-left: 2px solid goldenrod;
  padding-left: 1rem;
}
</style>