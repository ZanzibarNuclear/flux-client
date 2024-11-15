<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout :name="useDevice().isMobile ? 'mobile-flux' : 'default'">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
useHead({
  viewport: 'width=device-width, initial-scale=1',
  charset: 'utf-8',
  meta: [
    { name: 'description', content: 'Share your thoughts about nuclear energy using Flux at the World of Nuclear.' }
  ]
})
</script>
