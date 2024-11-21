<template>
  <div class="profile-container max-w-4xl mx-auto pt-8">
    <UTabs :items="tabs" default-active="0">
      <template #item="{ item }">
        <div class="p-4">
          <!-- Account Information -->
          <ProfileAccountInfo v-if="item.id === 'account'" :user="userProfile"
            :handle="fluxProfile?.handle as string" />

          <!-- Flux Information -->
          <ProfileFluxInfo v-if="item.id === 'flux'" :flux-profile="fluxProfile" />

          <!-- Settings -->
          <ProfileSettings v-if="item.id === 'settings'" :preferences="preferences" />
        </div>
      </template>
    </UTabs>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import type { FluxProfile } from '@/utils/types'

// const userStore = useUserStore()
// const fluxService = useFluxService()
const route = useRoute()
const handle = ref(route.params.handle)

const mockPreferences: UserPreferences = {
  theme: 'light',
  emailNotifications: true,
  digestFrequency: 'daily',
  showOnlineStatus: true,
}

const preferences = ref<UserPreferences>(mockPreferences)
preferences.value = mockPreferences

const mockUser: UserProfile = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  alias: 'NuclearFan',
  fullName: 'Nuclear Fan',
  avatarUrl: 'https://api.dicebear.com/9.x/shapes/svg?seed=NuclearFan',
  bio: 'Passionate about nuclear technology and its potential to combat climate change.',
  location: 'New York, NY',
  joinReason: 'I love nuclear energy',
  nuclearLikes: 'Small Modular Reactors, Fusion Research, Nuclear Safety Systems',
  xUsername: 'nuclear_fan',
  website: 'https://www.worldofnuclear.com',
  email: 'nuclear_fan@worldofnuclear.com',
  karmaScore: 100,
  preferences: mockPreferences,
  createdAt: '2024-10-01T06:42:37.000Z',
  updatedAt: '2024-11-15T00:00:00.000Z'
}

const userProfile = ref<UserProfile>(mockUser)
userProfile.value = mockUser

const mockFluxAchievements: Achievement[] = [
  {
    id: '1',
    name: 'First Flux',
    description: 'Created your first flux',
    karmaAwarded: 10,
    awardedAt: '2024-01-01T00:00:00.000Z'
  },
  {
    id: '2',
    name: 'First Boost',
    description: 'Boosted your first flux',
    karmaAwarded: 10,
    awardedAt: '2024-04-01T00:00:00.000Z'
  },
  {
    id: '3',
    name: '100 Fluxes',
    description: 'Created 100 fluxes',
    karmaAwarded: 50,
    awardedAt: '2024-02-01T00:00:00.000Z'
  },
  {
    id: '4',
    name: 'Chain Reaction',
    description: 'Received 20 reactions on a single flux',
    karmaAwarded: 50,
    awardedAt: '2024-03-01T00:00:00.000Z'
  },
  {
    id: '5',
    name: 'Influencer',
    description: 'Reached 1000 followers',
    karmaAwarded: 1000,
    awardedAt: '2024-05-01T00:00:00.000Z'
  }
]

const mockFluxProfile: FluxProfile = {
  id: '123',
  userId: '123',
  handle: 'NuclearEnthusiast',
  displayName: 'NuclearEnthusiast',
  fluxCount: 1250,
  reactionCount: 100,
  boostCount: 50,
  followerCount: 9999,
  followingCount: 100,
  createdAt: '2023-01-15T00:00:00.000Z',
  updatedAt: '2023-01-15T00:00:00.000Z',
  achievements: mockFluxAchievements
}
const fluxProfile = ref<FluxProfile>(mockFluxProfile)

const tabs = [
  {
    id: 'account',
    label: 'Account Info',
    icon: 'i-ph-user-circle-duotone'
  },
  {
    id: 'flux',
    label: 'Flux Activity',
    icon: 'i-ph-lightning-duotone'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'i-ph-gear-six-duotone'
  }
]

onMounted(async () => {
  if (handle.value) {
    fluxProfile.value = mockFluxProfile
  }
})
</script>