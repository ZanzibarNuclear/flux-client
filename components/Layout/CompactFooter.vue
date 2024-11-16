<template>
  <footer class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
    <nav>
      <div class="max-w-xl mx-auto px-4 py-3 flex justify-around">
        <UButton @click="() => goTo('/')" icon="i-ph-arrow-bend-left-up-duotone" variant="ghost" color="blue"
          class="flex-1 align-middle" label="Reload" />
        <UButton @click="() => goTo('/explore')" icon="i-ph-magnifying-glass-duotone" variant="ghost" color="blue"
          class="flex-1 align-middle" label="Explore" />
        <UButton @click="goToProfileOrSignIn" icon="i-ph-user-circle-duotone" variant="ghost" color="blue"
          class="flex-1 align-middle" label="Profile" />
        <UButton @click="aboutModalOpen = true" icon="i-ph-info-duotone" variant="ghost" color="blue"
          class="flex-1 align-middle" label="About" />
        <UButton @click="goToWoN" icon="i-ph-globe-simple-duotone" variant="ghost" color="blue"
          class="flex-1 align-middle" label="W-o-N" />
      </div>
    </nav>
    <UModal v-model="aboutModalOpen">
      <UCard>
        <template #header>
          <div class="text-center font-bold">About World of Nuclear</div>
        </template>
        <div>
          <div class="mb-4">Zanzibar's World of Nuclear Energy (WoN) is a platform for nuclear enthusiasts and
            professionals.
            It is a
            place
            to
            learn, share, and discuss nuclear energy.</div>
          <div class="text-sm text-gray-500">&copy; 2024 Nuclear Ambitions LLC. All rights reserved.</div>
        </div>
        <template #footer>
          <UButton @click="aboutModalOpen = false" label="OK" />
        </template>
      </UCard>
    </UModal>
  </footer>
</template>

<script lang="ts" setup>
const userStore = useUserStore()
const fluxStore = useFluxStore()

const aboutModalOpen = ref(false)

const goTo = (url: string) => {
  navigateTo(url)
}
const goToWoN = () => {
  goTo('https://www.worldofnuclear.com')
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