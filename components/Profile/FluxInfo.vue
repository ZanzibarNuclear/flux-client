<template>
  <div class="flux-info">
    <div class="stats-grid grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <UCard class="flux-identity">
        <div class="text-center">
          <h2 class="text-2xl font-bold">{{ fluxProfile?.displayName }}</h2>
          <p class="text-gray-600">@{{ fluxProfile?.handle }}</p>
        </div>
      </UCard>

      <UCard class="stat-card">
        <template #header>
          <div class="text-center">
            <div class="text-2xl font-bold">{{ fluxProfile?.fluxCount || 0 }}</div>
            <div class="text-sm text-gray-600">Fluxes</div>
          </div>
        </template>
      </UCard>

      <UCard class="stat-card">
        <template #header>
          <div class="text-center">
            <div class="text-2xl font-bold">{{ fluxProfile?.reactionCount || 0 }}</div>
            <div class="text-sm text-gray-600">Reactions</div>
          </div>
        </template>
      </UCard>

      <UCard class="stat-card">
        <template #header>
          <div class="text-center">
            <div class="text-2xl font-bold">{{ fluxProfile?.boostCount || 0 }}</div>
            <div class="text-sm text-gray-600">Boosts</div>
          </div>
        </template>
      </UCard>
    </div>

    <div class="network-info flex gap-4 mb-6">
      <UButton :to="`/profile/${fluxProfile?.handle}/connections`" variant="ghost">
        <template #leading>
          <span class="font-bold">{{ fluxProfile?.followingCount || 0 }}</span>
        </template>
        Following
      </UButton>

      <UButton :to="`/profile/${fluxProfile?.handle}/connections`" variant="ghost">
        <template #leading>
          <span class="font-bold">{{ fluxProfile?.followerCount || 0 }}</span>
        </template>
        Followers
      </UButton>
    </div>

    <div class="achievements mb-6">
      <h3 class="text-xl font-semibold mb-4">Achievements</h3>
      <div v-if="fluxProfile.achievements?.length">
        <ul>
          <li v-for="achievement in fluxProfile.achievements" :key="achievement.name" class="mb-2">
            <div class="font-bold">{{ achievement.name }}</div>
            <div class="text-sm text-gray-600">{{ achievement.description }}</div>
            <div class="text-sm text-gray-500">Awarded at: {{ achievement.awardedAt }}</div>
          </li>
        </ul>
      </div>
      <div v-else>
        <p class="text-gray-600">No achievements yet.</p>
      </div>
    </div>

    <div class="recent-activity">
      <h3 class="text-xl font-semibold mb-4">Recent Activity</h3>
      <FluxByAuthorScroller v-if="fluxProfile" :author="fluxProfile" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FluxProfile } from '@/utils/types'

defineProps<{
  fluxProfile: FluxProfile
}>()
</script>

<style></style>