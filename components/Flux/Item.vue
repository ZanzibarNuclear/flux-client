<template>
  <div class="flux-item">
    <img :src="flux.authorAvatar" :alt="flux.author" class="author-avatar">
    <div class="flux-content">
      <div class="flux-header">
        <span class="author-name">{{ flux.author }}</span>
        <span class="author-username">@{{ flux.authorUsername }}</span>
        <span class="flux-time">· {{ formatTime(flux.timestamp) }}</span>
      </div>
      <p class="flux-text">{{ flux.content }}</p>
      <div class="flux-actions">
        <button @click="handleReply" title="Reply">
          💬 {{ flux.replyCount }}
        </button>
        <button @click="handleAmplify" :class="{ 'amplified': flux.amplified }" title="Amplify">
          🔊 {{ flux.amplifyCount }}
        </button>
        <button @click="handleEnergize" :class="{ 'energized': flux.energized }" title="Energize">
          ⚡ {{ flux.energizeCount }}
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

function handleAmplify() {
  // Implement amplify functionality
  console.log('Amplify:', props.flux.id)
}

function handleEnergize() {
  // Implement energize functionality
  console.log('Energize:', props.flux.id)
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
  margin-bottom: 5px;
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

.energized {
  color: #e0245e !important;
}
</style>