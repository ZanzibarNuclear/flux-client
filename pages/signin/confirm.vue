<template>
  <div class="confirm-page">
    <h1>Sign In Confirmation</h1>
    <div v-if="userStore.isSignedIn" class="w-3/4">
      <div class="mb-4">Thanks for signing in. We are glad you are here.</div>
      <div class="mb-4">If you are reading this, you may need to help things along.</div>
      <div class="mb-4">If you just signed in for the first time, you can <NuxtLink to="/join">finish setting up your
          profile
        </NuxtLink>. Or if you already have a profile
        (with a handle and display name), you can <NuxtLink to="/">use Flux</NuxtLink>.</div>
    </div>
    <p v-else>
      Oh my. You are not signed in. Strange that you ended up here. Please <NuxtLink to="/join">try signing in
      </NuxtLink>.
      Or if you already tried, maybe we broke something. Hmm, that would be annoying.
    </p>
  </div>
</template>

<script setup lang="ts">
import { useCookie } from 'nuxt/app'

const userStore = useUserStore()
const authService = useAuthService()
const returnTo = useCookie('return-to')

onMounted(async () => {
  // expect cookie to have been sent by server and stored
  await authService.getCurrentUser()

  if (userStore.isSignedIn && returnTo.value) {
    navigateTo(returnTo.value)
    returnTo.value = ''
  } else {
    navigateTo('/')
  }
})
</script>

<style scoped>
.confirm-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
