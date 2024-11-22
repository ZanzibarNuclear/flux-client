<template>
  <div class="profile-container max-w-4xl mx-auto pt-8 pb-24">
    <UTabs :items="tabs" default-active="0">
      <template #item="{ item }">
        <div class="p-4">
          <!-- Account Information -->
          <ProfileAccountInfo v-if="item.id === 'account'" :user-profile="userProfile" />

          <!-- Flux Information -->
          <ProfileFluxInfo v-if="item.id === 'flux'" :handle="handle as string" :stats="mockFluxStats"
            :achievements="mockFluxAchievements" />

          <!-- Activity -->
          <ProfileSettings v-if="item.id === 'settings'" />
        </div>
      </template>
    </UTabs>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import type { Achievement, FluxProfile, FluxUserStats, UserProfile } from '@/utils/types'

const route = useRoute()
const handle = ref(route.params.handle)

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

const mockFluxStats: FluxUserStats = {
  fluxCount: 1250,
  reactionCount: 100,
  boostCount: 50,
  followerCount: 9999,
  followingCount: 100,
  karmaScore: 3742
}

const mockFluxProfile: FluxProfile = {
  id: '123',
  handle: 'NuclearEnthusiast',
  displayName: 'Nuclear Enthusiast Extraordinaire!!',
  joinedFluxAt: '2023-01-15T00:00:00.000Z',
  emailNotifications: true,
  textNotifications: true,
  digestFrequency: 'daily',
  stats: mockFluxStats
}

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
  joinedAt: '2024-10-01T06:42:37.000Z',
  updatedAt: '2024-11-15T00:00:00.000Z',
  fluxProfile: mockFluxProfile,
  achievements: mockFluxAchievements
}

const fluxProfile = ref<FluxProfile>(mockFluxProfile)
const userProfile = ref<UserProfile>(mockUser)

onMounted(async () => {
  if (handle.value) {
    fluxProfile.value = mockFluxProfile
  }
})
</script>