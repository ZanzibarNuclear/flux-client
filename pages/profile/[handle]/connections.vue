<template>
  <div class="max-w-4xl mx-auto p-4">
    <div class="mb-8">
      <h1 class="text-2xl font-bold mb-4">Connections for @{{ handle }}</h1>

      <!-- Tabs for switching between followers and following -->
      <div class="flex space-x-4 border-b mb-6">
        <button @click="activeTab = 'following'"
          :class="['px-4 py-2', activeTab === 'following' ? 'border-b-2 border-primary text-primary' : 'text-gray-600']">
          Following
        </button>
        <button @click="activeTab = 'followers'"
          :class="['px-4 py-2', activeTab === 'followers' ? 'border-b-2 border-primary text-primary' : 'text-gray-600']">
          Followers
        </button>
      </div>

      <!-- Connection list -->
      <div v-if="loading" class="text-center py-8">
        Loading...
      </div>
      <div v-else-if="connections.length === 0" class="text-center py-8 text-gray-500">
        No {{ activeTab }} yet
      </div>
      <div v-else class="space-y-4">
        <div v-for="user in connections" :key="user.id" class="flex items-center justify-between p-4 border rounded-lg">
          <div class="flex items-center space-x-4">
            <img :src="user.avatar" alt="" class="w-12 h-12 rounded-full">
            <div>
              <p class="font-medium">{{ user.name }}</p>
              <p class="text-sm text-gray-600">@{{ user.handle }}</p>
            </div>
          </div>
          <button v-if="activeTab === 'following'" @click="unfollowUser(user.id)"
            class="px-4 py-2 border rounded-lg hover:bg-gray-50">
            Unfollow
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const handle = computed(() => route.params.handle)
const activeTab = ref('following')
const loading = ref(true)
const connections = ref([])

// Fetch connections when tab changes
watch(activeTab, fetchConnections)

onMounted(() => {
  fetchConnections()
})

async function fetchConnections() {
  loading.value = true
  try {
    // Replace with your actual API endpoint
    const response = await fetch(`/api/users/${handle.value}/${activeTab.value}`)
    connections.value = await response.json()
  } catch (error) {
    console.error('Error fetching connections:', error)
  } finally {
    loading.value = false
  }
}

async function unfollowUser(userId) {
  try {
    // Replace with your actual API endpoint
    await fetch(`/api/users/${userId}/unfollow`, {
      method: 'POST'
    })
    // Refresh the list after unfollowing
    await fetchConnections()
  } catch (error) {
    console.error('Error unfollowing user:', error)
  }
}
</script>
