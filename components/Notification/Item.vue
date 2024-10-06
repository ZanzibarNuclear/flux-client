<template>
  <div class="notification-item" :class="notification.type">
    <img :src="notification.actorAvatar" :alt="notification.actorName" class="actor-avatar">
    <div class="notification-content">
      <p>
        <strong>{{ notification.actorName }}</strong>
        {{ getActionText(notification.type) }}
        <span v-if="notification.targetContent" class="target-content">{{ notification.targetContent }}</span>
      </p>
      <span class="notification-time">{{ formatTime(notification.timestamp) }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  notification: {
    type: Object,
    required: true
  }
})

function getActionText(type) {
  switch (type) {
    case 'amplify': return 'amplified your flux';
    case 'energize': return 'energized your flux';
    case 'reply': return 'replied to your flux';
    case 'mention': return 'mentioned you in a flux';
    case 'follow': return 'tuned in to you';
    default: return 'interacted with your flux';
  }
}

function formatTime(timestamp) {
  // Implement a function to format the timestamp (e.g., "2h ago", "1d ago")
  // For simplicity, we'll just return the date string here
  return new Date(timestamp).toLocaleString();
}
</script>

<style scoped>
.notification-item {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #e1e8ed;
}

.actor-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.notification-content {
  flex: 1;
}

.notification-time {
  color: #657786;
  font-size: 0.9em;
}

.target-content {
  color: #14171a;
  font-style: italic;
}

.amplify {
  background-color: rgba(23, 191, 99, 0.1);
}

.energize {
  background-color: rgba(224, 36, 94, 0.1);
}

.reply,
.mention {
  background-color: rgba(29, 161, 242, 0.1);
}

.follow {
  background-color: rgba(104, 109, 129, 0.1);
}
</style>