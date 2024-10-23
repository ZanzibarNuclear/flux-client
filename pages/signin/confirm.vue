<template>
  <div>
    <h1>Sign In Confirmation</h1>
    <p v-if="sessionToken">{{ confirmationMessage }}</p>
    <p v-else>No session token found. Please try signing in again.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const sessionToken = ref<string | null>(null)
const confirmationMessage = ref<string>('')

onMounted(() => {
  // Get session token from query string
  sessionToken.value = route.query.token as string | null

  if (sessionToken.value) {
    confirmationMessage.value = `Login successful! Your session token is: ${sessionToken.value}`
    // Here you might want to store the token in your auth store or local storage
    // For example: localStorage.setItem('sessionToken', sessionToken.value)
  }
})
</script>
