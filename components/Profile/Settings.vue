<template>
  <div class="settings">
    <div class="mb-4">
      <h3 class="text-lg font-semibold text-center mb-4">Preferences</h3>
      <div v-if="!isEditMode">
        <div class="read-only-preferences mb-6">
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <table class="table-auto w-full text-left">
                <tbody>
                  <tr>
                    <th class="font-bold">Theme:</th>
                    <td>{{ preferences.theme }}</td>
                  </tr>
                  <tr>
                    <th class="font-bold">Show Profile:</th>
                    <td>{{ preferences.showOnlineStatus ? 'Yes' : 'No' }}</td>
                  </tr>
                  <tr>
                    <th class="font-bold">Email Notifications:</th>
                    <td>{{ preferences.emailNotifications ? 'Yes' : 'No' }}</td>
                  </tr>
                  <tr v-if="preferences.emailNotifications">
                    <th class="font-bold">Email address:</th>
                    <td>{{ userData.email }}</td>
                  </tr>
                  <tr v-if="preferences.emailNotifications">
                    <th class="font-bold">Digest Frequency:</th>
                    <td>{{ preferences.digestFrequency }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <UButton icon="i-ph-pencil" size="xs" @click="isEditMode = true">
                Edit
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <UCard v-else class="mb-6">
        <template #header>
          <div class="text-md font-semibold">Change Preferences</div>
        </template>

        <table class="table-auto w-full text-left">
          <tbody>
            <tr>
              <th class="font-bold">Theme:</th>
              <td>
                <USelect v-model="preferences.theme" :options="themeOptions" @update:model-value="savePreferences" />
              </td>
            </tr>
            <tr>
              <th class="font-bold">Email Notifications:</th>
              <td>
                <UToggle v-model="preferences.emailNotifications" @update:model-value="savePreferences" />
              </td>
            </tr>
            <tr v-if="preferences.emailNotifications">
              <th class="font-bold">Email address:</th>
              <td>
                <div>{{ userData.email }}</div>
                <UButton icon="i-ph-envelope" size="xs" @click="isEmailModalOpen = true" label="Change email" />
              </td>
            </tr>
            <tr v-if="preferences.emailNotifications">
              <th class="font-bold">Digest Frequency:</th>
              <td>
                <USelect v-model="preferences.digestFrequency" :options="digestOptions"
                  @update:model-value="savePreferences" />
              </td>
            </tr>
          </tbody>
        </table>
      </UCard>
      <UModal v-model="isEmailModalOpen">
        <UCard>
          <template #header>
            <div class="text-md font-semibold">Change Email</div>
          </template>
          <div class="text-md mb-4">Enter your new email address. We will verify the change by sending a magic link.
            We
            will
            only make the change after you click the link.</div>
          <div class="flex justify-end gap-2">
            <UInput v-model="newEmail" label="New Email" />
            <UButton label="Send Magic Link" @click="sendVerification" color="blue" variant="solid"
              icon="i-ph-x-circle" />
            <UButton label="Cancel" @click="cancelVerification" color="blue" variant="solid" icon="i-ph-x-circle" />
          </div>
        </UCard>
      </UModal>
    </div>
  </div>

  <div class="flex-col">
    <div class="danger-zone mt-28">
      <h3 class="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
      <div class="text-md mb-4 text-red-500">While we wish you would stay, you are free to leave at any time.</div>
      <UButton color="red" variant="soft" label="Delete Account" icon="i-ph-trash" @click="isDeleteModalOpen = true" />
    </div>

    <UModal v-model="isDeleteModalOpen">
      <UCard>
        <template #header>
          <div class="text-md font-semibold">Are you sure?</div>
        </template>
        <div class="text-md mb-4">No worries. We are just making sure this is intentional. If you continue, your
          account
          will be deactivated. We will remove your personal data shortly thereafter.</div>
        <div class="flex justify-end gap-2">
          <UButton color="red" variant="soft" label="Yes, delete my account." icon="i-ph-trash"
            @click="confirmDelete" />
          <UButton label="Oops. Do not delete." @click="cancelDelete" color="blue" variant="solid"
            icon="i-ph-x-circle" />
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
const userStore = useUserStore()
const isEditMode = ref(false)
const newEmail = ref('')

const preferences = ref<UserPreferences>({
  theme: 'system',
  emailNotifications: true,
  digestFrequency: 'daily',
  showOnlineStatus: true
})

const userData = {
  email: 'void@void.com',
}

const isEmailModalOpen = ref(false)
const isDeleteModalOpen = ref(false)

const themeOptions = [
  { label: 'System Default', value: 'system' },
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' }
]

const digestOptions = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Never', value: 'never' }
]

onMounted(() => {
  // TODO: Fetch user preferences from API
  if (userStore.preferences) {
    preferences.value = { ...userStore.preferences }
  }
})

const savePreferences = async () => {
  try {
    // TODO: Implement API call to save preferences
    await useApi().put('/api/me/preferences', preferences.value)
  } catch (error) {
    console.error('Failed to save preferences:', error)
  }
}

const sendVerification = () => {
  // TODO: Implement email verification
  console.log('== Oi! Implement email verification ==')
  isEmailModalOpen.value = false
}
const cancelVerification = () => {
  isEmailModalOpen.value = false
}

const confirmDelete = () => {
  // TODO: Implement account deletion confirmation modal
  console.log('== Oi! Implement account deletion ==')
  isDeleteModalOpen.value = false
}

const cancelDelete = () => {
  console.log('Your account is safe...for now.')
  isDeleteModalOpen.value = false
}
</script>

<style></style>