<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout :name="isMobile ? 'mobile-flux' : 'default'">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
const { isMobile } = useDevice()

definePageMeta({
  layout: false
})
</script>
