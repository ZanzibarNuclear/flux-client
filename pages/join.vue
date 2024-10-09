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

    <section v-if="currentStep === 1" class="auth-options mt-8">
      <h2 class="text-2xl font-semibold mb-4">Step 1: Sign up or Sign in</h2>
      <h3>Use your account on one of these identity providers.</h3>
      <div class="flex justify-between gap-4">
        <UButton @click="() => loginWithOAuth('twitter')" icon="i-ph-x-logo"
          class="bg-nuclear-blue-400 text-white px-4 py-2 rounded">
          X
        </UButton>
        <UButton @click="() => loginWithOAuth('google')" icon="i-ph-google-logo"
          class="bg-nuclear-blue-400 text-white px-4 py-2 rounded">
          Google
        </UButton>
        <UButton @click="() => loginWithOAuth('github')" icon="i-ph-github-logo"
          class="bg-nuclear-blue-400 text-white px-4 py-2 rounded">
          GitHub
        </UButton>
      </div>
    </section>

    <section v-if="currentStep === 2" class="join-form mt-8">
      <h2 class="text-2xl font-semibold mb-4">Step 2: Create Your Flux Profile</h2>
      <form @submit.prevent="submitProfileForm">
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
        <li>
          <NuxtLink to="/">Absorb some flux (read what others have shared)</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="`/profile/${fluxStore.activeAuthor?.handle}`">Complete your profile</NuxtLink>
        </li>
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
import type { Provider } from '@supabase/supabase-js'
import type { FluxAuthor } from '@/utils/types'
import { useFluxStore } from '@/stores/flux'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const fluxStore = useFluxStore()
const router = useRouter()

const handle = ref('')
const displayName = ref('')
const currentStep = ref(1)
const errorMsg = ref('')
const author = ref<FluxAuthor | null>(null)

const loggedIn = computed(() => user.value !== null)
const hasError = computed(() => errorMsg.value !== '')

// Function to fetch user profile
const fetchUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('flux_authors')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
  return data
}

// Initialize the page
const initializePage = async () => {
  if (loggedIn.value) {
    // Check if profile exists in the store
    if (fluxStore.activeAuthor) {
      author.value = fluxStore.activeAuthor
      currentStep.value = 3
    } else {
      // Try to fetch profile from database
      const profile = await fetchUserProfile(user.value!.id)
      if (profile) {
        author.value = profile
        fluxStore.setActiveAuthor(profile)
        currentStep.value = 3
      } else {
        currentStep.value = 2
      }
    }
  } else {
    currentStep.value = 1
  }
  // Update URL to reflect current step
  router.push({ query: { step: currentStep.value.toString() } })
}

// Call initializePage when the component is mounted
onMounted(initializePage)

const loginWithOAuth = async (provider: Provider) => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${window.location.origin}/join?step=2`
    }
  })

  if (error) {
    console.error('OAuth error:', error)
  }
}

const submitProfileForm = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    console.error('User not authenticated:', error)
    currentStep.value = 1
    return
  }

  // TODO: Make sure handle has correct format (no spaces, only lowercase letters, numbers, and underscores)
  // TODO: Make sure handle is not already taken - avoid the non-unique error

  const { data, error: updateError } = await supabase
    .from('flux_authors')
    .upsert({
      user_id: user.id,
      handle: handle.value,
      display_name: displayName.value
    })
    .select()
    .single()

  if (updateError) {
    console.error('Profile update error:', updateError)
    errorMsg.value = 'Failed to create profile. Please try again.'
  } else if (data) {
    author.value = data
    fluxStore.setActiveAuthor(data)
    currentStep.value = 3
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
    router.push({ query: { step: currentStep.value.toString() } })
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
