<template>
  <div class="flux-item">
    <img :src="flux.authorAvatar" :alt="flux.author" class="author-avatar">
    <div class="flux-content">
      <div class="flux-header">
        <div class="flux-header-left">
          <span class="author-name">{{ flux.author }}</span>
          <span class="author-username">@{{ flux.authorUsername }}</span>
          <span class="flux-time">· {{ formatTime(flux.timestamp) }}</span>
        </div>
        <div class="flux-options">
          <Icon name="ph:arrow-bend-up-left-bold" size="large" class="options-icon" @click="handleReply" />
        </div>
      </div>
      <p class="flux-text">{{ flux.content }}</p>
      <div class="flux-actions">
        <button @click="handleSeeThread" title="Reply">
          💬 {{ flux.replyCount }}
        </button>
        <button @click="handleAmplify" :class="{ 'amplified': flux.amplified }" title="Amplify">
          🔊 {{ flux.amplifyCount }}
        </button>
        <button @click="handleBoost" :class="{ 'boosted': flux.boosted }" title="Boost">
          ⚡ {{ flux.boostCount }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  flux: {
    type: Object,
    required: true
  }
})

function formatTime(timestamp) {
  // Implement a function to format the timestamp (e.g., "2h ago", "1d ago")
  // For now, we'll just return the timestamp
  return new Date(timestamp).toLocaleString()
}

function handleReply() {
  // Implement reply functionality
  console.log('Reply to:', props.flux.id)
}

function handleSeeThread() {
  // Implement see thread functionality
  console.log('See thread:', props.flux.id)
}

function handleAmplify() {
  // Implement amplify functionality
  console.log('Amplify:', props.flux.id)
}

function handleBoost() {
  // Implement energize functionality
  console.log('Boost:', props.flux.id)
}
</script>

<style scoped>
.flux-item {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #e1e8ed;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.flux-content {
  flex: 1;
}

.flux-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.flux-header-left {
  display: flex;
  align-items: center;
}

.flux-options {
  margin-left: auto;
  cursor: pointer;
  color: #657786;
}

.author-name {
  font-weight: bold;
  margin-right: 5px;
}

.author-username,
.flux-time {
  color: #657786;
}

.flux-text {
  margin-bottom: 10px;
}

.flux-actions {
  display: flex;
  justify-content: space-between;
}

.flux-actions button {
  background: none;
  border: none;
  cursor: pointer;
  color: #657786;
}

.flux-actions button:hover {
  color: #1da1f2;
}

.amplified {
  color: #17bf63 !important;
}

.boosted {
  color: #e0245e !important;
}
</style>