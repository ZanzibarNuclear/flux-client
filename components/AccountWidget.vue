<template>
  <UButton
    v-if="!userStore.isSignedIn"
    icon="i-ph-sign-in-duotone"
    label="Sign In"
    to="/join"
    color="gray"
    variant="solid" />
  <UDropdown v-else :popper="{ placement: 'bottom-start' }" :items="items">
    <UButton
      color="primary"
      variant="solid"
      size="sm"
      :icon="widgetIcon"
      trailing-icon="i-ph-caret-double-down" />
  </UDropdown>
</template>

<script lang="ts" setup>
const userStore = useUserStore();
const fluxStore = useFluxStore();
const authService = useAuthService();

const widgetLabel = computed(() => userStore.alias || "You Know Who");
const widgetIcon = computed(() => "i-ph-user-duotone");

const items = computed(() => {
  const menuItems = [];
  if (fluxStore.profile) {
    menuItems.push({
      label: widgetLabel,
      icon: "i-ph-smiley-wink-duotone",
      to: `/profile/${fluxStore.profile.handle}`,
    });
  }
  menuItems.push({
    label: "Sign Out",
    icon: "i-ph-sign-out-duotone",
    click: async () => {
      await authService.signOut();
      fluxStore.clearProfile();
    },
  });
  return [menuItems];
});
</script>
