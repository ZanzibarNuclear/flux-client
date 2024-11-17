<template>
  <div>
    <div v-if="hasError" class="error-message mt-8">
      <p class="text-xl">{{ errorMsg }}</p>
    </div>

    <form @submit.prevent="onCreateFluxProfile">
      <div class="mb-4">
        <label for="handle" class="block mb-2 font-bold">Handle</label>
        <UInput v-model="handle" id="handle" type="text" required maxlength="21" :class="[
          'w-full px-3 py-2 border rounded',
          handleValidation.isValid ? '' : 'border-red-500',
        ]" @input="errorMsg = ''" />
        <p v-if="!handleValidation.isValid" class="text-red-500 text-sm mt-1">
          {{ handleValidation.message }}
        </p>
        <p class="text-gray-600 text-sm mt-1 pl-4">Only letters, numbers, hyphens and underscores allowed</p>
      </div>
      <div class="mb-4">
        <label for="displayName" class="block mb-2 font-bold">Display Name</label>
        <UInput v-model="displayName" id="displayName" type="text" required maxlength="25"
          class="w-full px-3 py-2 border rounded" />
        <p class="text-gray-600 text-sm mt-1 pl-4">Anything you want, up to 25 characters.</p>
      </div>
      <button type="submit" class="bg-nuclear-blue-400 text-white px-4 py-2 rounded">
        Create Profile
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
const fluxStore = useFluxStore()
const fluxService = useFluxService()

const handle = ref('')
const displayName = ref('')
const errorMsg = ref('')
const hasError = computed(() => errorMsg.value !== '')

const handleValidation = computed(() => {
  if (!handle.value) {
    return { isValid: false, message: 'Handle is required' }
  }

  // Check for whitespace
  if (/\s/.test(handle.value)) {
    return { isValid: false, message: 'Handle cannot contain spaces' }
  }

  // Only allow letters, numbers, hyphens and underscores
  if (!/^[a-zA-Z0-9_-]+$/.test(handle.value)) {
    return { isValid: false, message: 'Handle can only contain letters, numbers, hyphens and underscores' }
  }

  return { isValid: true, message: '' }
})

const onCreateFluxProfile = async () => {
  if (!handleValidation.value.isValid) {
    errorMsg.value = 'Please choose a handle that follows the rules.'
    return
  }
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

<style></style>