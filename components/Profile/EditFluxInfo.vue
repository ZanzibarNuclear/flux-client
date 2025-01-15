<template>
  <div class="my-16">
    <div v-if="hasError" class="error-message mt-8">
      <p class="text-xl">{{ errorMsg }}</p>
    </div>

    <form @submit.prevent="onUpdateFluxProfile">
      <UFormGroup class="my-4" label="Handle" size="sm" help="Only letters, numbers, hyphens and underscores allowed"
        hint="A unique identifier so that we know it's you."
        :error="!handleValidation.isValid && handleValidation.message" :ui="{ label: { base: 'text-lg font-bold' } }">
        <UInput v-model="formData.handle" id="handle" type="text" required maxlength="21"
          class="w-full px-3 py-2 border rounded" @input="errorMsg = ''" />
      </UFormGroup>
      <UFormGroup class="my-4" label="Display name" size="sm" help="Anything you want, up to 25 characters."
        hint="Whatever you want to be called." :ui="{ label: { base: 'text-lg font-bold' } }">
        <UInput v-model="formData.displayName" id="displayName" type="text" required maxlength="25"
          class="w-full px-3 py-2 border rounded" />
      </UFormGroup>
      <!-- <UFormGroup class="my-4" label="Email Notifications" size="sm"
        hint="Control whether you receive email notifications." :ui="{ label: { base: 'text-lg font-bold' } }">
        <UToggle v-model="formData.emailNotifications" />
      </UFormGroup>
      <div v-if="formData.emailNotifications">
        <div class="font-bold">Email address</div>
        <div>{{ formData.emailAddress }}</div>
        <UButton icon="i-ph-envelope" size="xs" @click="isEmailModalOpen = true" label="Change email" />
      </div>
      <UFormGroup v-if="formData.emailNotifications" class="my-4" label="Digest Frequency" size="sm"
        hint="Choose how frequently you want to receive email digests." :ui="{ label: { base: 'text-lg font-bold' } }">
        <USelect v-model="formData.digestFrequency" :options="digestOptions" />
      </UFormGroup> -->
      <div class="flex justify-end space-x-2">
        <UButton type="cancel" color="orange" icon="i-ph-x-circle">Cancel</UButton>
        <UButton type="submit" color="primary">Save Changes</UButton>
      </div>
    </form>

    <!-- <UModal v-model="isEmailModalOpen">
      <UCard>
        <template #header>
          <div class="text-md font-semibold">Change Email</div>
        </template>
<div class="text-md mb-4">Enter your new email address. We will verify the change by sending a magic link. We
  will only make the change after you click the link.</div>
<div class="flex justify-end gap-2">
  <UInput v-model="formData.emailAddress" label="New Email" />
  <UButton label="Send Magic Link" @click="sendVerification" color="blue" variant="solid" icon="i-ph-x-circle" />
  <UButton label="Cancel" @click="cancelVerification" color="blue" variant="solid" icon="i-ph-x-circle" />
</div>
</UCard>
</UModal> -->
  </div>
</template>

<script lang="ts" setup>
const fluxStore = useFluxStore()
const fluxService = useFluxService()

const props = defineProps<{
  profile: FluxProfile
  // email: string
}>()

const formData = reactive({
  ...props.profile,
  // emailAddress: props.email,
})

const errorMsg = ref('')
const hasError = computed(() => errorMsg.value !== '')

// const isEmailModalOpen = ref(false)

// const digestOptions = [
//   { label: 'Daily', value: 'daily' },
//   { label: 'Weekly', value: 'weekly' },
//   { label: 'Never', value: 'never' }
// ]

const handleValidation = computed(() => {
  if (!formData.handle) {
    return { isValid: false, message: 'Handle is required' }
  }

  // Check for whitespace
  if (/\s/.test(formData.handle)) {
    return { isValid: false, message: 'Handle cannot contain spaces' }
  }

  // Only allow letters, numbers, hyphens and underscores
  if (!/^[a-zA-Z0-9_-]+$/.test(formData.handle)) {
    return { isValid: false, message: 'Handle can only contain letters, numbers, hyphens and underscores' }
  }

  return { isValid: true, message: '' }
})

const onUpdateFluxProfile = async () => {
  if (!handleValidation.value.isValid) {
    errorMsg.value = 'Please choose a handle that follows the rules.'
    return
  }
  const isHandleAvailable = await fluxService.isHandleAvailable(formData.handle)
  if (!isHandleAvailable) {
    errorMsg.value = 'Handle is already taken. Please try another one.'
    return
  }

  try {
    const profile = await fluxService.createMyFluxProfile(formData.handle, formData.displayName)

    fluxStore.setProfile(profile as FluxProfile)
  } catch (error) {
    console.error('Error creating profile:', error)
    errorMsg.value = 'Failed to create profile. Please try again.'
  }
}

// const sendVerification = () => {
//   // TODO: Implement email verification
//   console.log('== Oi! Implement email verification ==')
//   isEmailModalOpen.value = false
// }

// const cancelVerification = () => {
//   isEmailModalOpen.value = false
// }
</script>

<style></style>