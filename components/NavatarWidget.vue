<template>
  <div>
    <div v-if="!userStore.isSignedIn">
      <div>
        <UButton label="Join" variant="solid" color="amber" icon="i-ph-arrow-bend-down-right-duotone" class="mr-2 mb-1"
          @click="openJoin" />
      </div>
      <div>
        <UButton label="Sign In" variant="solid" color="primary" icon="i-ph-sign-in" @click="openJoin" />
      </div>
    </div>
    <UDropdown v-if="userStore.isSignedIn" :items="items" :popper="{ placement: 'bottom-start' }" class="text-primary">
      <UButton color="primary" variant="solid" icon="i-ph-person" :label="screenName"
        trailing-icon="i-ph-caret-double-down" />
    </UDropdown>
  </div>
</template>

<script setup lang="ts">
// const user = useSupabaseUser()
const fluxStore = useFluxStore()
const userStore = useUserStore()
const authService = useAuthService()

const screenName = computed(() => {
  if (userStore.isSignedIn) {
    return userStore.credentials?.alias || 'Mystery Guest'
  } else {
    return 'anonymouns'
  }
})
const profileUrl = computed(() => {
  return `/profile/${fluxStore.fluxUser?.handle}`
})

onMounted(async () => {
  authService.fetchUserInfo()
})

const openJoin = () => {
  navigateTo('/join')
}

const items = [
  [
    {
      label: 'Profile',
      icon: 'i-ph-identification-card',
      to: profileUrl.value,
    },
    {
      label: 'Sign Out',
      icon: 'i-ph-sign-out',
      click: async () => {
        await useSupabaseClient().auth.signOut()
        fluxStore.clearFluxUser()
        navigateTo('/')
      },
    },
  ],
]
</script>

<style scoped>
.big-icon {
  font-size: 24px;
  margin-left: 2px;
}
</style>
