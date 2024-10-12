<template>
  <header class="p-4 w-full rounded-xl col-span-6">
    <NuxtLink to="/">
      <NuxtImg src="/images/logo-sq-smooth.jpg" alt="Logo" width="70" class="top-left" />
    </NuxtLink>
    <div class="title-bar text-center font-bold text-3xl text-slate-400 border-t-2 border-b-2">
      Zanzibar's World of Nuclear Energy
    </div>
    <div class="top-right">
      <NavatarWidget />
      <!-- <UButton v-if="!user" to="/join" icon="i-ph-sign-in" label="Sign In" />
      <UButton v-else to="/profile" icon="i-ph-user" label="Profile" /> -->
    </div>
  </header>
</template>

<script lang="ts" setup>
const user = useSupabaseUser()
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #e1e8ed;
}

nav a {
  margin-left: 20px;
  text-decoration: none;
  color: #1da1f2;
}
</style>
