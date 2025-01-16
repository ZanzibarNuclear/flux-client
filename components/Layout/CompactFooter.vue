<template>
  <footer
    class="fixed bottom-0 left-0 right-0 bg-heroic-uranium text-heroic-graphite dark:bg-heroic-graphite dark:text-heroic-lightgray border-t border-gray-200"
  >
    <nav>
      <div class="max-w-xl mx-auto px-4 py-3 flex justify-around">
        <UButton
          @click="refreshMainPage"
          icon="i-ph-arrow-bend-left-up-duotone"
          variant="ghost"
          color="blue"
          class="flex-1 align-middle"
          label="Latest"
        />
        <UButton
          @click="() => goTo('/explore')"
          icon="i-ph-magnifying-glass-duotone"
          variant="ghost"
          color="blue"
          class="flex-1 align-middle"
          label="Explore"
        />
        <UButton
          @click="aboutModalOpen = true"
          icon="i-ph-info-duotone"
          variant="ghost"
          color="blue"
          class="flex-1 align-middle"
          label="About"
        />
        <UButton
          @click="goToWoN"
          icon="i-ph-globe-simple-duotone"
          variant="ghost"
          color="blue"
          class="flex-1 align-middle"
          label="W-o-N"
        />
        <DarkToggle />
      </div>
    </nav>
    <UModal v-model="aboutModalOpen">
      <NuclearAmbitionsCard @close="aboutModalOpen = false" />
    </UModal>
  </footer>
</template>

<script lang="ts" setup>
const userStore = useUserStore()
const fluxStore = useFluxStore()

const aboutModalOpen = ref(false)

const refreshMainPage = () => {
  fluxStore.clearActiveFlux()
  useFluxService().fetchTimeline(true)
  navigateTo('/')
}
const goTo = (url: string) => {
  navigateTo(url)
}
const goToWoN = () => {
  navigateTo('https://www.worldofnuclear.com', { external: true })
}
const goToProfileOrSignIn = () => {
  if (!userStore.isSignedIn || !fluxStore.hasProfile) {
    navigateTo('/join')
  } else {
    navigateTo(`/profile/${fluxStore.profile?.handle}`)
  }
}
</script>

<style></style>
