<template>
  <div
    class="bg-heroic-uranium dark:bg-heroic-graphite text-heroic-graphite dark:text-heroic-lightgray"
  >
    <div class="mx-auto w-3/4 min-w-80">
      <LayoutCompactHeader />
      <div class="mt-[75px] mb-16">
        <slot />
      </div>
      <LayoutCompactFooter />
    </div>
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
