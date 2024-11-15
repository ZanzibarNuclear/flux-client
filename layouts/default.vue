<template>
  <div class="mx-auto w-3/4 min-w-[600px]">
    <LayoutCompactHeader />
    <div class="mt-[75px] mb-16">
      <div class="text-center">desktop ❤️</div>
      <slot />
    </div>
    <LayoutCompactFooter />
  </div>
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
</style>