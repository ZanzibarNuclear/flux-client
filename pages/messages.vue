<template>
  <div class="messages-page">
    <MessageConversations :conversations="conversations" :activeConversationId="activeConversationId"
      @select-conversation="selectConversation" />
    <div class="message-area" v-if="activeConversationId">
      <MessageList :messages="activeMessages" />
      <div class="message-input">
        <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message..." />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
    <div v-else class="no-conversation">
      Select a conversation to start messaging
    </div>
  </div>
</template>

<script setup>
const conversations = ref([
  { id: 1, participantName: 'Alice', participantAvatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Alice', lastMessage: 'Hey, how are you?' },
  { id: 2, participantName: 'Bob', participantAvatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Bob', lastMessage: 'Did you see the latest Flux?' },
])

const messages = ref({
  1: [
    { id: 1, content: 'Hey, how are you?', senderName: 'Alice', senderAvatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Alice', timestamp: '2023-05-01T10:00:00Z', isOwn: false },
    { id: 2, content: 'I\'m good, thanks! How about you?', senderName: 'You', timestamp: '2023-05-01T10:05:00Z', isOwn: true },
  ],
  2: [
    { id: 1, content: 'Did you see the latest Flux?', senderName: 'Bob', senderAvatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Bob', timestamp: '2023-05-01T11:00:00Z', isOwn: false },
    { id: 2, content: 'Not yet, what\'s it about?', senderName: 'You', timestamp: '2023-05-01T11:10:00Z', isOwn: true },
  ],
})

const activeConversationId = ref(null)
const newMessage = ref('')

const activeMessages = computed(() => {
  return activeConversationId.value ? messages.value[activeConversationId.value] : []
})

function selectConversation(id) {
  activeConversationId.value = id
}

function sendMessage() {
  if (newMessage.value.trim() && activeConversationId.value) {
    const message = {
      id: Date.now(),
      content: newMessage.value,
      senderName: 'You',
      timestamp: new Date().toISOString(),
      isOwn: true
    }
    messages.value[activeConversationId.value].push(message)
    newMessage.value = ''
  }
}
</script>

<style scoped>
.messages-page {
  display: flex;
  height: calc(100vh - 60px);
  /* Adjust based on your header height */
}

.message-area {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.message-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #e1e8ed;
}

.message-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #e1e8ed;
  border-radius: 20px;
  margin-right: 10px;
}

.message-input button {
  padding: 10px 20px;
  background-color: #1da1f2;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.no-conversation {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: #657786;
}
</style>