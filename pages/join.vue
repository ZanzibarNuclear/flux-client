<template>
  <div class="join-page">
    <section class="hero">
      <h1 class="text-6xl font-bold text-nuclear-blue-400">Flux</h1>
      <img src="/images/flux-theme-v1.jpg" alt="Join the conversation - Show your flux"
        class="w-full h-64 object-cover">
    </section>

    <section v-if="hasError" class="error-message mt-8">
      <p class="text-xl">{{ errorMsg }}</p>
    </section>

    <section class="explanation mt-8">
      <p class="text-xl">
        Join Flux! Be part of the conversation about nuclear energy.
        Share your thoughts. Connect with others, and learn from each other. Together, we can advance the way the world
        thinks about nuclear energy.
      </p>
    </section>

    <section v-if="isStep1" class="auth-options mt-8">
      <h2 class="text-2xl font-semibold mb-4">Step 1: Sign up or Sign in</h2>
      <AuthMagicLink />
      <AuthIdentityProviders />
    </section>

    <section v-if="isStep2" class="join-form mt-8">
      <h2 class="text-2xl font-semibold mb-4">Step 2: Create Your Flux Profile</h2>
      <form @submit.prevent="onCreateFluxProfile">
        <div class="mb-4">
          <label for="handle" class="block mb-2">Handle</label>
          <input v-model="handle" id="handle" type="text" required class="w-full px-3 py-2 border rounded">
        </div>
        <div class="mb-4">
          <label for="displayName" class="block mb-2">Display Name</label>
          <input v-model="displayName" id="displayName" type="text" required class="w-full px-3 py-2 border rounded">
        </div>
        <button type="submit" class="bg-nuclear-blue-400 text-white px-4 py-2 rounded">
          Create Profile
        </button>
      </form>
    </section>

    <section v-if="isStep3" class="congratulations mt-8">
      <h2 class="text-2xl font-semibold mb-4">Step 3: Congratulations!</h2>
      <p>Welcome to Flux! Here are some tips to get started:</p>
      <ul class="list-disc list-inside mt-2">
        <li>
          <NuxtLink to="/">Absorb some flux (read what others have shared)</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/profile/${fluxStore.profile?.handle}`">Complete your profile</NuxtLink>
        </li>
        <li>Start a conversation</li>
      </ul>
      <div class="mt-4">
        <h3>A little light reading...</h3>
        <a href="#" class="text-nuclear-blue-400">Terms of Use</a> |
        <a href="#" class="text-nuclear-blue-400">FAQ</a>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { FluxProfile } from '@/utils/types'
import { useFluxStore } from '@/stores/flux'

const userStore = useUserStore()
const fluxStore = useFluxStore()
const fluxService = useFluxService()

const handle = ref('')
const displayName = ref('')
const errorMsg = ref('')
const hasError = computed(() => errorMsg.value !== '')
const isStep1 = computed(() => !userStore.isSignedIn)
const isStep2 = computed(() => !isStep1.value && !fluxStore.hasProfile)
const isStep3 = computed(() => !isStep1.value && !isStep2.value)

const initializePage = async () => {
  if (!userStore.isSignedIn) {
    console.log('no user found; should go to step 1')
  } else if (!fluxStore.hasProfile) {
    console.log('no flux profile found; should go to step 2')
  } else {
    console.log('should go to step 3')
  }
}

// Call initializePage when the component is mounted
onMounted(async () => {
  await initializePage()
})


const onCreateFluxProfile = async () => {
  const isHandleAvailable = await fluxService.checkFluxHandleAvailability(handle.value)
  if (!isHandleAvailable) {
    errorMsg.value = 'Handle is already taken. Please try another one.'
    return
  }

  try {
    const profile = await fluxService.createMyFluxProfile(handle.value, displayName.value)

    fluxStore.setProfile(profile as FluxProfile)
  } catch (error) {
    console.error('Error creating profile:', error)
    errorMsg.value = 'Failed to create profile. Please try again.'
  }
}
</script>

<style scoped>
.join-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.hero {
  position: relative;
}

.hero h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.error-message {
  color: red;
}
</style>
