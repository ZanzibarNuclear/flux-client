<template>
  <div class="account-info">
    <div class="flex items-start gap-6">
      <div class="avatar-section flex flex-col items-center">
        <UAvatar :src="user?.avatarUrl" size="xl" />
        <UButton v-if="isEdit" icon="i-ph-pencil" size="xs" class="mt-2" @click="editAvatar">
          Change Avatar
        </UButton>
      </div>

      <div class="flex-1">
        <div class="mb-4">
          <h2 class="text-2xl font-bold">{{ user?.alias }}</h2>
          <p class="text-gray-600">{{ user?.fullName }}</p>
          <p class="text-gray-600">{{ user?.email }}</p>
          <p v-if="!isEdit" class="text-sm text-gray-500">Joined {{ formatDate(user?.createdAt) }}</p>
          <p v-if="!isEdit" class="text-sm text-gray-500">Updated {{ formatDate(user?.updatedAt) }}</p>
          <p class="text-sm text-gray-500">{{ user?.id }}</p>
        </div>

        <div class="bio-section mb-4">
          <h3 class="font-semibold mb-2">About</h3>
          <dl>
            <div class="mb-4">
              <dt class="font-bold">Mini biography:</dt>
              <dd>{{ user?.bio || 'No bio yet' }}</dd>
            </div>
            <div class="mb-4">
              <dt class="font-bold">Location:</dt>
              <dd>{{ user?.location || 'Not specified' }}</dd>
            </div>
            <div class="mb-4">
              <dt class="font-bold">Nuclear Energy Interests:</dt>
              <dd>{{ user?.nuclearLikes || 'Not specified' }}</dd>
            </div>
            <div class="mb-4">
              <dt class="font-bold">Reason for Joining:</dt>
              <dd>{{ user?.joinReason || 'Not specified' }}</dd>
            </div>
          </dl>
        </div>

        <div class="karma-score">
          <h3 class="font-semibold mb-2">Karma Score</h3>
          <UBadge color="green" size="lg">{{ user.karmaScore }}</UBadge>
          <div class="karma-history-link mt-4">
            <UButton :to="`/profile/${handle}/karma-history`" variant="ghost">
              View Karma History
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatDate } from '@/utils/dateUtils'
import type { UserProfile } from '@/utils/types'

defineProps<{
  user: UserProfile
  handle: string
}>()

const isEdit = ref(false)

const editAvatar = () => {
  // TODO: Implement avatar editing
}
</script>

<style></style>