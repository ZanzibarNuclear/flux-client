<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout :name="useDevice().isMobile ? 'mobile-flux' : 'default'">
    <NuxtPage />
  </NuxtLayout>
</template>
