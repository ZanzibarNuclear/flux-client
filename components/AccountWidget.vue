<template>
  <UButton v-if="!userStore.isSignedIn" icon="i-ph-sign-in" label="Sign In" to="/join" color="gray" variant="solid" />
  <UDropdown v-else :popper="{ placement: 'bottom-start' }" :items="items">
    <UButton color="primary" variant="solid" :icon="widgetIcon" :label="widgetLabel"
      trailing-icon="i-ph-caret-double-down" />
  </UDropdown>
</template>

<script lang="ts" setup>
const userStore = useUserStore()
const fluxStore = useFluxStore()
const authService = useAuthService()

const widgetLabel = computed(() => userStore.alias || 'You Know Who')
const widgetIcon = computed(() => 'i-ph-user-duotone')

const items = computed(() => {
  return [
    [
      {
        label: 'Profile',
        icon: 'i-ph-user-circle-duotone',
        to: `/profile/${userStore.alias}`,
      },
      {
        label: 'Sign Out',
        icon: 'i-ph-sign-out',
        click: async () => {
          await authService.signOut()
          fluxStore.clearProfile()
        },
      },
    ]
  ]
})
</script>