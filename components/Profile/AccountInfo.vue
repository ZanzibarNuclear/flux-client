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
          <h2>{{ isEdit ? 'Make Changes' : userProfile.alias }}</h2>
          <UButton :icon="isEdit ? 'i-ph-x' : 'i-ph-pencil'" @click="toggleEdit">
            {{ isEdit ? 'Cancel' : 'Edit Profile' }}
          </UButton>
        </div>

        <form v-if="isEdit" @submit.prevent="saveChanges" class="space-y-4">
          <UFormGroup label="Alias">
            <UInput v-model="formData.alias" />
          </UFormGroup>

          <UFormGroup label="Full Name">
            <UInput v-model="formData.fullName" />
          </UFormGroup>

          <template v-if="hasFluxProfile">
            <UFormGroup label="Flux Handle">
              <UInput v-model="fluxProfileData.handle" />
            </UFormGroup>

            <UFormGroup label="Display Name">
              <UInput v-model="fluxProfileData.displayName" />
            </UFormGroup>
          </template>

          <UFormGroup label="Mini Biography">
            <UTextarea v-model="formData.bio" />
          </UFormGroup>

          <UFormGroup label="Location">
            <UInput v-model="formData.location" />
          </UFormGroup>

          <UFormGroup label="Nuclear Energy Interests">
            <UTextarea v-model="formData.nuclearLikes" />
          </UFormGroup>

          <UFormGroup label="Reason for Joining">
            <UTextarea v-model="formData.joinReason" />
          </UFormGroup>

          <div class="flex justify-end">
            <UButton type="submit" color="primary">Save Changes</UButton>
          </div>
        </form>

        <div v-else>
          <div class="mb-4">
            <h3 class="text-lg font-semibold">Account Details</h3>
            <div class="text-gray-600 mb-2">Your World of Nuclear account.</div>
            <table class="table-auto w-full text-left">
              <tbody>
                <tr>
                  <th class="font-bold">Alias:</th>
                  <td class="text-gray-600">{{ userProfile.alias }}</td>
                </tr>
                <tr>
                  <th class="font-bold">Name:</th>
                  <td class="text-gray-600">{{ userProfile.fullName }}</td>
                </tr>
                <tr>
                  <th class="font-bold">Email:</th>
                  <td class="text-gray-600">{{ userProfile.email }}</td>
                </tr>
                <tr v-if="!isEdit">
                  <th class="font-bold">Joined on:</th>
                  <td class="text-sm text-gray-500">{{ formatDate(userProfile.joinedAt) }}</td>
                </tr>
                <tr>
                  <th class="font-bold">User ID:</th>
                  <td class="text-sm text-gray-500">{{ userProfile.id }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="hasFluxProfile" class="profile-section my-8">
            <h3 class="text-lg font-semibold">Flux Profile</h3>
            <div class="text-gray-600 mb-2">How other Flux users see you.</div>
            <table class="table-auto w-full text-left">
              <tbody>
                <tr>
                  <th class="font-bold">Handle:</th>
                  <td class="text-gray-600">{{ userProfile.fluxProfile?.handle }}</td>
                </tr>
                <tr>
                  <th class="font-bold">Display name:</th>
                  <td class="text-gray-600">{{ userProfile.fluxProfile?.displayName }}</td>
                </tr>
                <tr>
                  <th class="font-bold">Joined Flux:</th>
                  <td class="text-gray-600">{{ formatDate(userProfile.fluxProfile?.joinedFluxAt) }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="bio-section my-8">
            <h3 class="text-lg font-semibold">About</h3>
            <dl>
              <div class="mb-4">
                <dt class="font-bold">Mini biography:</dt>
                <dd>{{ userProfile.bio || 'No bio yet' }}</dd>
              </div>
              <div class="mb-4">
                <dt class="font-bold">Location:</dt>
                <dd>{{ userProfile.location || 'Not specified' }}</dd>
              </div>
              <div class="mb-4">
                <dt class="font-bold">Nuclear Energy Interests:</dt>
                <dd>{{ userProfile.nuclearLikes || 'Not specified' }}</dd>
              </div>
              <div class="mb-4">
                <dt class="font-bold">Reason for Joining:</dt>
                <dd>{{ userProfile.joinReason || 'Not specified' }}</dd>
              </div>
            </dl>
          </div>
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
}>()

const emit = defineEmits<{
  'update:profile': [profile: UserProfile]
}>()

const hasFluxProfile = computed(() => props.userProfile.fluxProfile !== null)
const isEdit = ref(false)
const formData = ref({ ...props.userProfile })
const fluxProfileData = ref({ ...props.userProfile.fluxProfile })

const toggleEdit = () => {
  isEdit.value = !isEdit.value
  if (isEdit.value) {
    formData.value = JSON.parse(JSON.stringify(props.userProfile))
  }
}

const saveChanges = () => {
  emit('update:profile', formData.value)
  isEdit.value = false
}

const editAvatar = () => {
  // TODO: Implement avatar editing
}
</script>

<style></style>