<!-- layouts/mobile.vue -->
<template>
  <UContainer>
    <header :class="{ 'hidden': isHeaderHidden }" class="app-header">
      <h1>Mobile Header</h1>
    </header>
    <UButton @click="toggleMenu" class="hamburger-button" icon="ph:list-bold" variant="ghost" color="gray" />
    <div v-if="isMenuVisible" class="menu-popup">
      <LayoutSidebar @close="toggleMenu" />
    </div>
    <div class="main-content" @scroll="handleScroll">
      <main class="page-content">
        <h1 class="text-center">Mobile Layout</h1>
        <slot />
      </main>
    </div>
  </UContainer>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isHeaderHidden = ref(false)
const isMenuVisible = ref(false)

const toggleMenu = () => {
  isMenuVisible.value = !isMenuVisible.value
}

let lastScrollY = 0

const handleScroll = (event) => {
  const currentScrollY = event.target.scrollTop
  isHeaderHidden.value = currentScrollY > lastScrollY
  lastScrollY = currentScrollY
}

onMounted(() => {
  // Add any additional setup if needed
})
</script>

<style>
.app-header {
  transition: top 0.3s;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: white;
  z-index: 10;
}

.hidden {
  top: -100px;
  /* Adjust based on header height */
}

.menu-popup {
  position: absolute;
  top: 50px;
  /* Adjust based on header height */
  right: 0;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 20;
}

.main-content {
  margin-top: 60px;
  /* Adjust based on header height */
  overflow-y: auto;
  height: calc(100vh - 60px);
  /* Adjust based on header height */
}

.hamburger-button {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 15;
}
</style>