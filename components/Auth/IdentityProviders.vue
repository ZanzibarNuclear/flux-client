<template>
  <div>
    <h3>Use your account on one of these services.</h3>
    <p>The service you select will ask for your permission before confirming your identity.</p>
    <p class="text-red-500 text-lg text-center pb-4">Note: These are a work in progress. Please use the magic link for
      now.
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
  <p>In case you are wondering, we will save your email address and other information that you have already made public.
    You will be able to see and modify this information in your World of Nuclear profile.</p>
</template>

<script lang="ts" setup>
const loginWithAuthService = async (provider: string) => {
  const returnTo = useCookie('return-to')
  returnTo.value = '/join?step=2'
  await useAuthService().findIdentity(provider)
}
</script>

<style></style>