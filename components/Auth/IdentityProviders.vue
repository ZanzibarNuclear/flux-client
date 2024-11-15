<template>
  <div>
    <h3>Use your account on one of these identity providers.</h3>
    <div class="flex justify-between gap-4">
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
  const returnTo = useCookie('return-to')
  returnTo.value = '/join?step=2'
  await useAuthService().findIdentity(provider)
}
</script>

<style></style>