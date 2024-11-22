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
        <div class="mb-4">
          <h2>{{ userProfile.alias }}</h2>
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
</template>

<script lang="ts" setup>
import { formatDate } from '@/utils/dateUtils'
import type { UserProfile } from '@/utils/types'

const props = defineProps<{
  userProfile: UserProfile
}>()

const hasFluxProfile = computed(() => props.userProfile.fluxProfile !== null)
const isEdit = ref(false)

const editAvatar = () => {
  // TODO: Implement avatar editing
}
</script>

<style></style>