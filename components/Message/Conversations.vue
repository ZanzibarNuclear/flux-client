<template>
  <div class="conversation-list">
    <h2>Conversations</h2>
    <div v-for="conversation in conversations" :key="conversation.id" class="conversation-item"
      :class="{ active: conversation.id === activeConversationId }"
      @click="$emit('select-conversation', conversation.id)">
      <img :src="conversation.participantAvatar" :alt="conversation.participantName" class="avatar">
      <div class="conversation-info">
        <h3>{{ conversation.participantName }}</h3>
        <p class="last-message">{{ conversation.lastMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  conversations: {
    type: Array,
    required: true
  },
  activeConversationId: {
    type: Number,
    default: null
  }
})

defineEmits(['select-conversation'])
</script>

<style scoped>
.conversation-list {
  border-right: 1px solid #e1e8ed;
  width: 300px;
  height: 100%;
  overflow-y: auto;
}

.conversation-item {
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.conversation-item:hover,
.conversation-item.active {
  background-color: #f5f8fa;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.conversation-info {
  flex: 1;
}

h3 {
  margin: 0;
  font-size: 16px;
}

.last-message {
  margin: 5px 0 0;
  font-size: 14px;
  color: #657786;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>