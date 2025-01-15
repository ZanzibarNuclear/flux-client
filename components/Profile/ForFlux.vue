<template>
  <div class="account-info">
    <div class="flex items-start gap-6">
      <div class="avatar-section flex flex-col items-center">
        <UAvatar :src="userProfile.avatarUrl" size="xl" />
        <UButton v-if="isEdit" icon="i-ph-pencil" size="xs" class="mt-2" @click="editAvatar">
          Change Avatar
        </UButton>
      </div>

      <div class="flex-1">
        <div class="flex justify-between mb-4">
          <h2>{{ isEdit ? 'Make Changes' : fluxProfile.displayName }}</h2>
          <UButton :icon="isEdit ? 'i-ph-x' : 'i-ph-pencil'" :color="isEdit ? 'orange' : 'primary'" @click="toggleEdit">
            {{ isEdit ? 'Cancel' : 'Edit Profile' }}
          </UButton>
        </div>
        <div class="text-gray-600 -mt-6">@{{ fluxProfile.handle }}</div>

        <ProfileEditFluxInfo v-if="isEdit" :profile="fluxProfile" :email="userProfile.email" />

        <div v-else>
          <div class="profile-section my-8">
            <h3 class="text-lg font-semibold">Flux Profile</h3>
            <div class="text-gray-600 mb-2">How others identify you.</div>
            <table class="table-auto w-full text-left">
              <tbody>
                <tr>
                  <th class="font-bold">Handle:</th>
                  <td class="text-gray-600">{{ fluxProfile?.handle }}</td>
                </tr>
                <tr>
                  <th class="font-bold">Display name:</th>
                  <td class="text-gray-600">{{ fluxProfile?.displayName }}</td>
                </tr>
                <tr>
                  <th class="font-bold">Joined Flux:</th>
                  <td class="text-gray-600">{{ formatDate(fluxProfile?.joinedFluxAt) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- <div class="profile-section my-8">
            <h3 class="text-lg font-semibold">Preferences</h3>
            <div class="text-gray-600 mb-2">Control your experience.</div>
            <table class="table-auto w-full text-left">
              <tbody>
                <tr>
                  <th class="font-bold">Email notifications:</th>
                  <td class="text-gray-600">{{ fluxProfile?.emailNotifications ? 'Yes' : 'No' }}</td>
                </tr>
                <tr v-if="fluxProfile?.emailNotifications">
                  <th class="font-bold">Email address:</th>
                  <td class="text-gray-600">{{ userProfile?.email }}</td>
                </tr>
                <tr v-if="fluxProfile?.emailNotifications">
                  <th class="font-bold">Digest frequency:</th>
                  <td class="text-gray-600">{{ fluxProfile?.digestFrequency }}</td>
                </tr>
              </tbody>
            </table>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatDate } from '@/utils/dateUtils'
import type { UserProfile } from '@/utils/types'

const props = defineProps<{
  userProfile: UserProfile
  fluxProfile: FluxProfile
}>()

const emit = defineEmits<{
  'update:profile': [profile: UserProfile]
}>()

const isEdit = ref(false)
const formData = ref({ ...props.userProfile })

const toggleEdit = () => {
  isEdit.value = !isEdit.value
  if (isEdit.value) {
    formData.value = JSON.parse(JSON.stringify(props.userProfile))
  }
}

const editAvatar = () => {
  // TODO: Implement avatar editing
}
</script>

<style></style>