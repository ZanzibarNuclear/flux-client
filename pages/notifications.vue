<template>
  <div class="notifications-page">
    <h1>Notifications</h1>
    <div v-if="loading" class="loading">Loading notifications...</div>
    <div v-else-if="notifications.length === 0" class="no-notifications">
      No new notifications.
    </div>
    <template v-else>
      <NotificationItem v-for="notification in notifications" :key="notification.id" :notification="notification" />
    </template>
  </div>
</template>

<script setup>
const notifications = ref([])
const loading = ref(true)

onMounted(async () => {
  await fetchNotifications()
})

async function fetchNotifications() {
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  // Mock notifications data
  notifications.value = [
    {
      id: 1,
      type: 'amplify',
      actorName: 'Alice',
      actorAvatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Alice',
      targetContent: 'Check out this amazing new technology!',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 2,
      type: 'energize',
      actorName: 'Bob',
      actorAvatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Bob',
      targetContent: 'Just launched my new project!',
      timestamp: new Date(Date.now() - 7200000).toISOString()
    },
    {
      id: 3,
      type: 'reply',
      actorName: 'Charlie',
      actorAvatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Charlie',
      targetContent: 'That\'s awesome! Can you share more details?',
      timestamp: new Date(Date.now() - 10800000).toISOString()
    },
    {
      id: 4,
      type: 'mention',
      actorName: 'David',
      actorAvatar: 'https://api.dicebear.com/6.x/initials/svg?seed=David',
      targetContent: 'Hey @user, what do you think about this?',
      timestamp: new Date(Date.now() - 14400000).toISOString()
    },
    {
      id: 5,
      type: 'follow',
      actorName: 'Eve',
      actorAvatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Eve',
      timestamp: new Date(Date.now() - 18000000).toISOString()
    }
  ]

  loading.value = false
}
</script>

<style scoped>
.notifications-page {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 20px;
}

.loading,
.no-notifications {
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: #657786;
}
</style>