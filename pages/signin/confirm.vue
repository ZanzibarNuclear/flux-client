<template>
  <div>
    <h1>Sign In Confirmation</h1>
    <div v-if="sessionToken" class="w-3/4">
      <p>{{ confirmationMessage }}</p>
      <p>Now that you're signed in, you can:</p>
      <ul>
        <li>
          <NuxtLink to="/join?step=2">Use Flux</NuxtLink>
        </li>
      </ul>
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

const route = useRoute()
const sessionToken = ref<string | null>(null)
const confirmationMessage = ref<string>('')

onMounted(() => {
  // Get session token from query string
  const token = route.query.token as string | null

  if (token) {
    // Store the token in a cookie
    const cookie = useCookie('session-token', {
      maxAge: 60 * 60 * 24 * 90, // 90 days
      secure: true,
      httpOnly: true,
      sameSite: 'strict'
    })
    cookie.value = token

    sessionToken.value = token
    confirmationMessage.value = 'Login successful! You are now authenticated.'
  }
})
</script>
