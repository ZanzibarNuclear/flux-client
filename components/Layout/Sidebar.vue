<template>
  <aside class="sidebar">
    <nav>
      <NuxtLink to="/" class="nav-item">
        <span class="icon">🏠</span>
        <span class="label">Home</span>
      </NuxtLink>
      <NuxtLink to="/explore" class="nav-item">
        <span class="icon">🔍</span>
        <span class="label">Explore</span>
      </NuxtLink>
      <!-- <NuxtLink to="/notifications" class="nav-item">
        <span class="icon">🔔</span>
        <span class="label">Notifications</span>
      </NuxtLink>
      <NuxtLink to="/messages" class="nav-item">
        <span class="icon">✉️</span>
        <span class="label">Messages</span>
      </NuxtLink> -->
      <NuxtLink :to="`/profile/${currentUser.username}`" class="nav-item">
        <span class="icon">👤</span>
        <span class="label">Profile</span>
      </NuxtLink>
    </nav>
    <div class="user-info">
      <img :src="currentUser.avatar" :alt="currentUser.name" class="user-avatar">
      <div class="user-details">
        <span class="user-name">{{ currentUser.name }}</span>
        <span class="user-username">@{{ currentUser.username }}</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
// Mock current user data (replace with actual auth system later)
const currentUser = ref({
  name: 'John Doe',
  username: 'johndoe',
  avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=JD'
})
</script>

<style scoped>
.sidebar {
  width: 200px;
  padding: 20px;
  border-right: 1px solid #e1e8ed;
  height: 100vh;
  position: sticky;
  top: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  text-decoration: none;
  color: #14171a;
  font-size: 18px;
  border-radius: 30px;
  margin-bottom: 10px;
}

.nav-item:hover {
  background-color: rgba(29, 161, 242, 0.1);
  color: #1da1f2;
}

.icon {
  margin-right: 15px;
  font-size: 24px;
}

.flux-button {
  background-color: #1da1f2;
  color: white;
  border: none;
  padding: 15px 0;
  border-radius: 30px;
  font-size: 18px;
  font-weight: bold;
  width: 100%;
  cursor: pointer;
  margin-top: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding: 12px;
  border-radius: 30px;
  cursor: pointer;
}

.user-info:hover {
  background-color: rgba(29, 161, 242, 0.1);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: bold;
}

.user-username {
  color: #657786;
}
</style>