<template>
  <div class="user-profile-page">
    <FluxUserProfile :username="username" />
    <FluxTimeline :username="username" @select-flux="handleSelectFlux" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const selectedFlux = ref(null)

const route = useRoute()
const username = route.params.username

const handleSelectFlux = (flux) => {
  console.log('show selected flux', flux)
  selectedFlux.value = flux
}
</script>

<style scoped>
.user-profile-page {
  max-width: 600px;
  margin: 0 auto;
}
</style>