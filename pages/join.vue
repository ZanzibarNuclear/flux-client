<template>
  <div class="join-page">
    <section class="hero">
      <h1 class="text-6xl font-bold text-nuclear-blue-400">Flux</h1>
      <img src="/images/flux-theme-v1.jpg" alt="Join the conversation - Show your flux"
        class="w-full h-64 object-cover">
    </section>

    <section class="explanation mt-8">
      <p class="text-xl">
        Join Flux and be part of the next-generation conversation platform.
        Share your thoughts, connect with like-minded individuals, and shape the future of online discourse.
      </p>
    </section>

    <section v-if="currentStep === 1" class="auth-options mt-8">
      <h2 class="text-2xl font-semibold mb-4">Step 1: Sign up or Sign in</h2>
      <button @click="loginWithOAuth" class="bg-nuclear-blue-400 text-white px-4 py-2 rounded">
        Login with OAuth
      </button>
    </section>

    <section v-if="currentStep === 2" class="join-form mt-8">
      <h2 class="text-2xl font-semibold mb-4">Step 2: Create Your Flux Profile</h2>
      <form @submit.prevent="submitJoinForm">
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

    <section v-if="currentStep === 3" class="congratulations mt-8">
      <h2 class="text-2xl font-semibold mb-4">Step 3: Congratulations!</h2>
      <p>Welcome to Flux! Here are some tips to get started:</p>
      <ul class="list-disc list-inside mt-2">
        <li>Complete your profile</li>
        <li>Join some communities</li>
        <li>Start a conversation</li>
      </ul>
      <div class="mt-4">
        <a href="#" class="text-nuclear-blue-400">Terms of Use</a> |
        <a href="#" class="text-nuclear-blue-400">FAQ</a>
      </div>
    </section>

    <div v-if="currentStep > 1" class="mt-4">
      <button @click="previousStep" class="text-nuclear-blue-400">Back</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuth } from '@/composables/useAuth'

const { user, login } = useAuth()

const handle = ref('')
const displayName = ref('')
const currentStep = ref(1)

const loginWithOAuth = async () => {
  await login()
  if (user.value) {
    currentStep.value = 2
  }
}

const submitJoinForm = () => {
  // Implement form submission logic
  console.log('Joining with:', { handle: handle.value, displayName: displayName.value })
  currentStep.value = 3
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
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
</style>