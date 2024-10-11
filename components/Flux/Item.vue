<template>
  <div class="flux-item">
    <UAvatar @click="handleViewProfile" class="clickable" :src="flux.author?.avatar"
      :alt="flux.author?.display_name || '?? User'" />
    <div class="flux-content">
      <div class="flux-header">
        <div class="flux-header-left">
          <span @click="handleViewProfile" class="author-name clickable">{{ flux.author.display_name }}</span>
          <span @click="handleViewProfile" class="author-username clickable">@{{ flux.author.handle }}</span>
          <span class="flux-time"> - {{ formatTimeAgo(flux.created_at) }}</span>
        </div>
        <UButton @click="handleReply" icon="i-ph-arrow-bend-up-left-duotone" label="Reply" color="blue"
          variant="ghost" />
      </div>
      <div @click="handleView" class="clickable">
        <p class="flux-text">{{ flux.content }}</p>
      </div>
      <div class="flux-actions">
        <UButton @click="handleView" icon="i-ph-eye" label="View" color="gray" variant="ghost">
          {{ flux.view_count }} Views
        </UButton>
        <UButton @click="handleReply" icon="i-ph-chat-circle-text" color="gray" variant="ghost">
          {{ flux.reply_count }} Replies
          <Icon v-if="flux.replied" name="i-ph-star" />
        </UButton>
        <UButton @click="handleBoost" icon="i-ph-lightning" color="blue" :variant="flux.boosted ? 'solid' : 'ghost'">
          {{ flux.boost_count }} Boosts
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatTimeAgo } from '@/utils/dateUtils';

const props = defineProps({
  flux: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['replyToFlux', 'viewFlux', 'boostFlux', 'viewProfile'])

function handleView() {
  emit('viewFlux', props.flux)
}

function handleBoost() {
  emit('boostFlux', props.flux)
}

function handleReply() {
  emit('replyToFlux', props.flux)
}

function handleViewProfile() {
  emit('viewProfile', props.flux.author.handle)
}
</script>

<style scoped>
.flux-item {
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid theme('colors[nuclear-blue]300');
}

.flux-content {
  margin-left: 1rem;
  flex: 1;
}

.flux-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.author-name {
  font-weight: bold;
}

.author-username,
.flux-time {
  color: #6b7280;
}

.flux-text {
  margin-bottom: 0.5rem;
}

.flux-actions {
  display: flex;
  gap: 1rem;
}

.clickable {
  cursor: pointer;
}
</style>