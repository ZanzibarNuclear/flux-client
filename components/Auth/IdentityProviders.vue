<template>
  <div>
    <h3>Use your account on one of these services.</h3>
    <p class="mb-4">The service you select will ask for your permission before confirming your identity.</p>
    <p class="text-red-500 text-lg text-center py-4 mb-2">Note: These are out of order. Please try using a magic link.
    </p>
    <div class="flex justify-around">
      <UButton @click="() => loginWithAuthService('x')" icon="i-ph-x-logo"
        class="bg-nuclear-blue-400 text-white px-4 py-2 rounded">
        X
      </UButton>
      <UButton @click="() => loginWithAuthService('google')" icon="i-ph-google-logo"
        class="bg-nuclear-blue-400 text-white px-4 py-2 rounded">
        Google
      </UButton>
      <UButton @click="() => loginWithAuthService('github')" icon="i-ph-github-logo"
        class="bg-nuclear-blue-400 text-white px-4 py-2 rounded">
        GitHub
      </UButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
const loginWithAuthService = async (provider: string) => {
  await useAuthService().findIdentity(provider)
}
</script>

<style></style>