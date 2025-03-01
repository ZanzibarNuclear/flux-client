<template>
  <article
    class="py-6 pr-2 text-heroic-graphite dark:text-heroic-lightgray bg-heroic-uranium dark:bg-heroic-graphite"
  >
    <div class="flex gap-3">
      <UAvatar
        @click="handleViewProfile"
        class="w-10 h-10 flex-shrink-0 bg-uranium-ore-darker dark:bg-uranium-ore-bright"
        :src="flux.author?.avatar"
        :alt="flux.author?.displayName || '?? User'"
      />
      <div class="flex-1">
        <div class="flex items-center gap-2">
          <span @click="handleViewProfile" class="font-bold">{{ flux.author?.displayName }}</span>
          <span @click="handleViewProfile" class="">@{{ flux.author?.handle }}</span>
          <span class="">· {{ formatTimeAgo(flux.createdAt) }}</span>
          <UButton
            class="ml-auto"
            @click="handleReply"
            :disabled="isReactingTo"
            icon="i-ph-arrow-bend-up-left-duotone"
            label="React"
            color="primary"
            variant="ghost"
          />
        </div>
        <div @click="handleView" class="mt-1">
          <div class="rich-text" v-html="flux.content" />
        </div>
        <div
          class="flex justify-between mt-3 bg-heroic-uranium dark:bg-heroic-graphite border-heroic-cherenkov border border-solid"
        >
          <UButton
            @click="handleReply"
            icon="i-ph-chat-circle-text"
            color="primary"
            variant="ghost"
          >
            {{ flux.reply_count }} Reactions
            <Icon v-if="flux.replied" name="i-ph-star" />
          </UButton>
          <UButton
            @click="handleBoost"
            icon="i-ph-lightning"
            color="primary"
            :variant="flux.boosted ? 'solid' : 'ghost'"
          >
            {{ flux.boost_count }} Boosts
          </UButton>
          <UButton @click="handleView" icon="i-ph-eye" label="View" color="primary" variant="ghost">
            {{ flux.view_count }} Views
          </UButton>
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { formatTimeAgo } from '@/utils/dateUtils'

const props = defineProps({
  flux: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['viewFlux', 'replyToFlux'])

const fluxStore = useFluxStore()
const isReactingTo = computed(() => {
  return fluxStore.isReply && fluxStore.activeFlux?.id === props.flux.id
})

const handleView = async () => {
  await useFluxService().viewFlux(props.flux.id)
  useFluxStore().setActiveFlux(props.flux as Flux)
  emit('viewFlux', props.flux)
}

const handleReply = async () => {
  await useFluxService().viewFlux(props.flux.id)
  useFluxStore().setActiveFlux(props.flux as Flux, true)
  emit('replyToFlux', props.flux)
}

const handleBoost = async () => {
  await useFluxService().boostFlux(props.flux.id)
}

const handleViewProfile = () => {
  const handle = props.flux.author?.handle
  if (!handle) {
    console.error('no handle to view profile')
    return
  }
  navigateTo(`/profile/${handle}`)
}
</script>

<style scoped>
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
  @apply border-l-2 border-solid border-uranium-ore-darker dark:border-uranium-ore-bright;
  padding-left: 1rem;
}
</style>
