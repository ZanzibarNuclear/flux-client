<template>
  <div>
    <h1>Sign In Confirmation</h1>
    <div v-if="sessionToken" class="w-3/4">
      <p>Login successful! You are now authenticated.</p>
      <p>Session token: {{ sessionToken }}</p>

      <div v-if="authService.loading">
        <p>Loading user info...</p>
      </div>
      <div v-else-if="authService.error">
        <p>Error loading user info: {{ authService.error }}</p>
      </div>
      <div v-else>
        <p>We shall call you {{ userStore.alias || 'The Amazing Wonder Person' }}</p>
        <p>Your user ID is {{ userStore.userId || 'unknown' }}</p>
      </div>

      <div v-if="userStore.isSignedIn">
        <p>Now that you're signed in, you can:</p>
        <ul>
          <li>
            <NuxtLink to="/join?step=2">Use Flux</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <p v-else>
      No session token found. Please try signing in again. Or if you already have, maybe we broke something.
      Hmm, that would be annoying.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCookie } from 'nuxt/app'

const userStore = useUserStore()
const authService = useAuthService()

const route = useRoute()
const sessionToken = ref<string | null>(null)

onMounted(() => {
  // expect cookie to have been sent by server and stored
  authService.getCurrentUser()

  // alternate: pass session token via query string
  const token = route.query.token as string | null
  if (token) {
    console.log('Keeping session token in cookie')
    const cookie = useCookie('blah-token', {
      maxAge: 60 * 60 * 24 * 90, // 90 days
      secure: true,
      httpOnly: true,
      sameSite: 'lax'
    })
    cookie.value = token
    sessionToken.value = token
  }
})
</script>
