<template>
  <div class="user-profile-page">
    <UserProfile :username="username" />
    <FluxTimeline :username="username" />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const username = route.params.username
</script>

<style scoped>
.user-profile-page {
  max-width: 600px;
  margin: 0 auto;
}
</style>