<template>
  <div class="flux-item">
    <UAvatar :src="flux.author?.avatar" :alt="flux.author?.display_name || 'User'" @click="handleShowProfile" />
    <div class="flux-content">
      <div class="flux-header">
        <div class="flux-header-left">
          <span class="author-name" @click="handleShowProfile">{{ flux.author.display_name }}</span>
          <span class="author-username">@{{ flux.author.handle }}</span>
          <span class="flux-time"> - {{ formatTimeAgo(flux.created_at) }}</span>
        </div>
        <UButton @click="handleReply" icon="i-ph-arrow-bend-up-left-duotone" label="Reply" color="blue"
          variant="ghost" />
      </div>
      <div @click="handleSeeThread">
        <p class="flux-text">{{ flux.content }}</p>
      </div>
      <div class="flux-actions">
        <UButton icon="i-ph-eye" label="View" color="gray" variant="ghost">
          {{ flux.view_count }} Views
        </UButton>
        <UButton icon="i-ph-chat-circle-text" color="gray" variant="ghost">
          {{ flux.reply_count }} Replies
          <Icon v-if="flux.replied" name="i-ph-star" />
        </UButton>
        <UButton icon="i-ph-lightning" color="blue" :variant="flux.boosted ? 'solid' : 'ghost'" @click="handleBoost">
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
const emit = defineEmits(['reply', 'seeThread', 'boost', 'profile'])

function handleReply() {
  emit('reply', props.flux)
}

function handleShowProfile() {
  emit('profile', props.flux.id)
}

function handleSeeThread() {
  emit('seeThread', props.flux)
}

function handleBoost() {
  emit('boost', props.flux.id)
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
</style>