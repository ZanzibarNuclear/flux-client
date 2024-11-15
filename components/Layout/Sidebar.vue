<template>
  <aside class="sidebar mt-32">
    <nav class="flex flex-col gap-4">
      <NuxtLink to="/" class="nav-item">
        <UIcon name="i-ph-arrow-bend-left-up-duotone" class="w-8 h-8" />
        <span class="pl-2">Fluxlines</span>
      </NuxtLink>
      <NuxtLink to="/explore" class="nav-item">
        <UIcon name="i-ph-magnifying-glass-duotone" class="w-8 h-8" />
        <span class="pl-2">Explore</span>
      </NuxtLink>
      <NuxtLink v-if="fluxStore.profile" :to="`/profile/${fluxStore.profile.handle}`" class="nav-item">
        <UIcon name="i-ph-user-circle-duotone" class="w-8 h-8" />
        <span class="pl-2">Profile</span>
      </NuxtLink>
      <NuxtLink v-else to="/join" class="nav-item">
        <UIcon name="i-ph-sign-in-duotone" class="w-8 h-8" />
        <span class="label">Sign in</span>
      </NuxtLink>
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

const refreshFluxlines = () => {
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