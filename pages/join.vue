<template>
  <div class="join-page mx-auto pb-32">
    <section class="hero">
      <h1 class="text-center text-nuclear-blue-600 text-4xl font-bold">Flux</h1>
      <img src="/images/flux-theme-v1.jpg" alt="Join the conversation - Show your flux"
        class="w-full h-64 object-cover">
    </section>

    <section class="explanation mt-8">
      <p class="text-xl">
        Join Flux! Be part of the conversation about nuclear energy.
        Share your thoughts. Connect with others, and learn from each other. Together, we can advance the way the world
        thinks about nuclear energy.
      </p>
    </section>

    <section v-if="isStep1" class="auth-options mt-8 mb-16">
      <h2 class="text-2xl font-semibold mb-4">Step 1: Sign up or Sign in</h2>
      <AuthMagicLink />
      <AuthIdentityProviders />
    </section>

    <section v-if="isStep2" class="join-form mt-8 mb-16">
      <h2 class="text-2xl font-semibold mb-4">Step 2: Create Your Flux Profile</h2>
      <FluxUserProfileSetup />
    </section>

    <section v-if="isStep3" class="congratulations mt-8 mb-16">
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
      </div>
    </section>

    <UDivider icon="i-ph-info-duotone" size="xl" type="dashed"
      :ui="{ border: { base: 'border-nuclear-blue-300' }, icon: { base: 'text-nuclear-blue-400' } }" />

    <section class="">
      <div class="text-center font-bold text-2xl py-4">Information About Using Flux
      </div>
      <div class="flex flex-col gap-2">
        <div>We only use your email address to verify who you are and to communicate with you about this service. To
          find
          out more about this and other ways we use data, please see our <NuxtLink
            to="https://nuclearambitions.com/legal/privacy-policy.html">privacy
            policy</NuxtLink>.</div>
        <div>By signing up, you agree to our terms of use, which includes the use of cookies because that's how the Web
          works. If you would like to review the details, please see our complete <NuxtLink
            to="https://nuclearambitions.com/legal/terms-of-use.html">terms of
            use</NuxtLink>.
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
const userStore = useUserStore()
const fluxStore = useFluxStore()

const isStep1 = computed(() => !userStore.isSignedIn)
const isStep2 = computed(() => !isStep1.value && !fluxStore.hasProfile)
const isStep3 = computed(() => !isStep1.value && !isStep2.value)

onMounted(() => {
  if (!userStore.isSignedIn) {
    console.log('no user found; should go to step 1')
  } else if (!fluxStore.hasProfile) {
    console.log('no flux profile found; should go to step 2')
  } else {
    console.log('should go to step 3')
  }
})
</script>

<style scoped>
.join-page {
  max-width: 600px;
}

.error-message {
  color: red;
}
</style>
