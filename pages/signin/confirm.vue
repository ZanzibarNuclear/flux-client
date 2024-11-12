<template>
  <div>
    <h1>Sign In Confirmation</h1>
    <div v-if="sessionToken" class="w-3/4">
      <p>Login successful! You are now authenticated.</p>

      <div v-if="isLoading">
        <p>Loading user info...</p>
      </div>
      <div v-else-if="error">
        <p>Error loading user info: {{ error }}</p>
      </div>
      <div v-else>
        <p>We shall call you {{ userStore.alias || 'The Amazing Wonder Person' }}</p>
        <p>Your user ID is {{ userStore.id || 'unknown' }}</p>
      </div>

      <div v-if="userStore.isSignedIn">
        <p>Now that you're signed in, you can:</p>
        <ul>
          <li>
            <NuxtLink v-if="!!returnTo" :to="returnTo">Go back to where you were.</NuxtLink>
            <NuxtLink to="/">Use Flux</NuxtLink>
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
import { useRoute } from 'vue-router'
import { useCookie } from 'nuxt/app'

const userStore = useUserStore()
const authService = useAuthService()

const route = useRoute()
const sessionToken = ref<string | null>(null)
const returnTo = useCookie('return-to')

const isLoading = computed(() => authService.loading.value)
const error = computed(() => authService.error.value)

onMounted(() => {
  // expect cookie to have been sent by server and stored
  authService.getCurrentUser()
  sessionToken.value = route.query.token as string
})
</script>
