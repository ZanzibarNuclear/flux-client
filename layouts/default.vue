<template>
  <UContainer>
    <div class="app-container">
      <LayoutHeader />
      <UButton @click="toggleSidebar" class="hamburger-button" icon="ph:list-bold" color="gray" />
      <div class="main-content">
        <LayoutSidebar v-if="isSidebarVisible" />
        <main class="page-content">
          <h1 class="text-center">WoN Flux &ndash; Let's get reactive</h1>
          <slot />
        </main>
      </div>
      <LayoutFooter />
      <div class="text-center">desktop ❤️</div>
    </div>
  </UContainer>
</template>

<script setup>
const authService = useAuthService()
const userStore = useUserStore()
const fluxService = useFluxService()
const fluxStore = useFluxStore()
const isSidebarVisible = ref(false)

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value
}

onMounted(async () => {
  if (!userStore.isSignedIn) {
    try {
      await authService.getCurrentUser()
    } catch (error) {
      console.error('Error fetching current user:', error)
      return
    }
  }
  if (!fluxStore.hasProfile) {
    await fluxService.fetchMyFluxProfile()
  }
})
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background-color: #f6f2eb;
}

.app-container {
  margin: 0 auto;
}

.main-content {
  display: flex;
}

.page-content {
  flex-grow: 1;
  padding: 0 20px;
}

.hamburger-button {
  display: none;
}

@media (max-width: 768px) {
  .hamburger-button {
    display: block;
  }

  .main-content {
    flex-direction: column;
  }

  LayoutSidebar {
    display: none;
  }

  .main-content>* {
    width: 100%;
  }
}
</style>