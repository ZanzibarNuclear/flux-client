<template>
  <div class="settings-container">
    <UCard class="mb-6">
      <template #header>
        <h3 class="text-lg font-semibold">Theme Preferences</h3>
      </template>

      <USelect v-model="preferences.theme" :options="themeOptions" label="Display Theme"
        @update:model-value="savePreferences" />
    </UCard>

    <UCard class="mb-6">
      <template #header>
        <h3 class="text-lg font-semibold">Email Notifications</h3>
      </template>

      <div class="space-y-4">
        <UToggle v-model="preferences.emailNotifications" label="Receive Email Notifications"
          @update:model-value="savePreferences" />

        <USelect v-if="preferences.emailNotifications" v-model="preferences.digestFrequency" :options="digestOptions"
          label="Digest Frequency" @update:model-value="savePreferences" />
      </div>
    </UCard>

    <UCard class="mb-6">
      <template #header>
        <h3 class="text-lg font-semibold">Privacy Settings</h3>
      </template>

      <UToggle v-model="preferences.showOnlineStatus" label="Show Online Status"
        @update:model-value="savePreferences" />
    </UCard>

    <div class="danger-zone mt-8">
      <h3 class="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
      <UButton color="red" variant="soft" label="Delete Account" icon="i-ph-trash" @click="confirmDelete" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { UserPreferences } from '@/utils/types'

const userStore = useUserStore()
const preferences = ref<UserPreferences>({
  theme: 'system',
  emailNotifications: true,
  digestFrequency: 'daily',
  showOnlineStatus: true
})

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

const confirmDelete = () => {
  // TODO: Implement account deletion confirmation modal
}
</script>

<style></style>