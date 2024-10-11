<template>
  <aside class="sidebar">
    <nav>
      <NuxtLink @click="goToTop" to="/" class="nav-item">
        <span class="icon">🏠</span>
        <span class="label">Overview</span>
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
      <NuxtLink v-if="fluxStore.activeAuthor" :to="`/profile/${fluxStore.activeAuthor.handle}`" class="nav-item">
        <span class="icon">👤</span>
        <span class="label">Profile</span>
      </NuxtLink>
      <NuxtLink v-else to="/join" class="nav-item">
        <UIcon name="i-ph-sign-in" />
        <span class="label">Sign in or Join</span>
      </NuxtLink>
      <hr class="my-4 border-t-2 border-slate-300" />
      <NuxtLink to="https://worldofnuclear.com" class="nav-item">
        <span class="icon">🌐</span>
        <span>World of Nuclear</span>
      </NuxtLink>
    </nav>
  </aside>
</template>

<script setup>
import { useFluxStore } from '@/stores/flux'

const fluxStore = useFluxStore()

const goToTop = () => {
  fluxStore.clearActiveFlux()
  navigateTo('/')
}
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