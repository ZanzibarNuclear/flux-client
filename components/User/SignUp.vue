<template>
  <div>
    <h2>Sign Up for Flux</h2>
    <button @click="startOAuth">Sign Up with OAuth</button>

    <form v-if="showAdditionalInfo" @submit.prevent="completeSignUp">
      <input v-model="handle" placeholder="Username (handle)" required>
      <input v-model="displayName" placeholder="Display Name" required>
      <button type="submit">Complete Sign Up</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '~/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const showAdditionalInfo = ref(false)
const handle = ref('')
const displayName = ref('')

const startOAuth = async () => {
  // Implement OAuth2 flow here
  // This is a placeholder for the actual OAuth implementation
  const oauthResult = { success: true } //await someOAuthService.authenticate()

  if (oauthResult.success) {
    showAdditionalInfo.value = true
  }
}

const completeSignUp = async () => {
  try {
    // Send user data to your backend
    // TODO: Replace with composable
    // const userData = await api.createUser({
    //   // Include OAuth data here
    //   handle: handle.value,
    //   displayName: displayName.value,
    // })

    // userStore.setUser(userData)
    router.push('/complete-profile') // Or wherever you want to redirect after signup
  } catch (error) {
    console.error('Error during sign up:', error)
    // Handle error (show message to user, etc.)
  }
}
</script>
