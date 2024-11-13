<template>
  <UContainer>
    <div class="app-container">
      <LayoutHeader />
      <div class="main-content">
        <LayoutSidebar />
        <main class="page-content">
          <h1 class="text-center">WoN Flux &ndash; Let's get reactive</h1>
          <slot />
        </main>
      </div>
      <LayoutFooter />
    </div>
  </UContainer>
</template>

<script setup>
const authService = useAuthService()
const userStore = useUserStore()
const fluxService = useFluxService()
const fluxStore = useFluxStore()

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
</style>