<template>
  <div class="message-list" ref="messageContainer">
    <div v-for="message in messages" :key="message.id" class="message" :class="{ 'own-message': message.isOwn }">
      <img v-if="!message.isOwn" :src="message.senderAvatar" :alt="message.senderName" class="avatar">
      <div class="message-content">
        <p>{{ message.content }}</p>
        <span class="timestamp">{{ formatTime(message.timestamp) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  messages: {
    type: Array,
    required: true
  }
})

const messageContainer = ref(null)

onUpdated(() => {
  scrollToBottom()
})

function scrollToBottom() {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight
  }
}

function formatTime(timestamp) {
  return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
.message-list {
  height: calc(100% - 60px);
  overflow-y: auto;
  padding: 20px;
}

.message {
  display: flex;
  margin-bottom: 15px;
}

.own-message {
  flex-direction: row-reverse;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.own-message .avatar {
  display: none;
}

.message-content {
  max-width: 70%;
  padding: 10px;
  border-radius: 18px;
  background-color: #f1f0f0;
}

.own-message .message-content {
  background-color: #1da1f2;
  color: white;
}

.timestamp {
  font-size: 12px;
  color: #657786;
  margin-top: 5px;
  display: block;
}

.own-message .timestamp {
  text-align: right;
}
</style>