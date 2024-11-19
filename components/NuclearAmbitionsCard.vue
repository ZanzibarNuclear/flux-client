<template>
  <UCard>
    <template #header>
      <div class="text-center font-bold">About World of Nuclear</div>
    </template>
    <div>
      <div class="mb-4">Zanzibar's World of Nuclear Energy (a.k.a. World of Nuclear, a.k.a. WoN) is a platform for
        nuclear enthusiasts and professionals. It is a place to learn, share, and discuss nuclear energy.</div>
      <div>Learn more about:
        <ul class="list-disc pl-6 my-4">
          <li>
            <NuxtLink to="https://nuclearambitions.com">Nuclear Ambitions LLC</NuxtLink>
          </li>
          <li>
            <NuxtLink to="https://nuclearambitions.com/legal/terms-of-use.html">Terms of Use</NuxtLink>
          </li>
          <li>
            <NuxtLink to="https://nuclearambitions.com/legal/privacy-policy.html">Privacy Policy</NuxtLink>
          </li>
        </ul>
      </div>
      <div class="text-sm text-gray-500">&copy; 2024 Nuclear Ambitions LLC. All rights reserved.</div>
    </div>
    <template #footer>
      <UButton @click="close" label="OK" />
    </template>
  </UCard>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>
<style scoped>
li {
  margin-bottom: 0.5rem;
}
</style>
