<template>
  <div>
    <div v-if="!signedIn">
      <div>
        <UButton label="Join" variant="solid" color="amber" icon="i-ph-arrow-bend-down-right-duotone" class="mr-2 mb-1"
          @click="openJoin" />
      </div>
      <div>
        <UButton label="Sign In" variant="solid" color="primary" icon="i-ph-sign-in" @click="openJoin" />
      </div>
    </div>
    <UDropdown v-if="signedIn" :items="items" :popper="{ placement: 'bottom-start' }" class="text-primary">
      <UButton color="primary" variant="solid" icon="i-ph-person" :label="screenName"
        trailing-icon="i-ph-caret-double-down" />
    </UDropdown>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const fluxStore = useFluxStore()

const signedIn = computed(() => !!user.value)
const screenName = computed(() => {
  if (!signedIn.value) {
    return 'Guest'
  } else if (!fluxStore.fluxUser) {
    return 'Special Guest'
  } else {
    return fluxStore.fluxUser?.display_name
  }
})
const profileUrl = computed(() => {
  return `/profile/${fluxStore.fluxUser?.handle}`
})

onMounted(async () => {
  // TODO: load flux user if logged in -- implement in composable
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
