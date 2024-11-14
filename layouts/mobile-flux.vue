<!-- app.vue -->
<template>
  <div class="max-w-lg mx-auto bg-gray-50 min-h-screen">
    <!-- Fixed Header -->
    <header class="app-header fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
      <div class="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
        <NuxtImg src="/images/logo-sq-smooth.jpg" alt="World of Nuclear Logo" class="w-12 h-12 -mt-4" />
        <h1 class="text-x3l font-bold text-[nuclear-blue]">Flux on World of Nuclear</h1>
        <UButton icon="i-heroicons-bars-3" color="white" class="-mt-3" />
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="mt-[75px] mb-16">
      <slot />
    </main>

    <!-- Fixed Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div class="max-w-lg mx-auto px-4 py-3 flex justify-around">
        <UButton v-for="item in navigationItems" :key="item.label" :icon="item.icon" variant="ghost" class="flex-1" />
      </div>
    </nav>
    <LayoutFooter />
    <div class="text-center">mobile ❤️</div>
  </div>
</template>

<script setup>
const authService = useAuthService()
const userStore = useUserStore()
const fluxService = useFluxService()
const fluxStore = useFluxStore()

const navigationItems = [
  { label: 'Home', icon: 'i-heroicons-home' },
  { label: 'Notifications', icon: 'i-heroicons-bell' },
  { label: 'Messages', icon: 'i-heroicons-envelope' },
  { label: 'Profile', icon: 'i-heroicons-user' }
]

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

<style scoped>
.app-header {
  transition: top 0.3s;
  position: fixed;
  top: 0;
  width: 100%;
  height: 75px;
  /* Match the image height */
  z-index: 10;

  /* Add background image */
  /* background-image: url('/images/lush-landscape-1024x75.jpg'); */
  background-image: url('/images/electric-sky-banner-768x100.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>