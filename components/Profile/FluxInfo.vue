<template>
  <div class="flux-info">
    <h3 class="text-lg font-semibold text-center mb-4">Flux Stats</h3>
    <div class="stats-grid grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      <UCard class="stat-card">
        <template #header>
          <div class="text-center">
            <div class="text-2xl font-bold">{{ stats.fluxCount || 0 }}</div>
            <div class="text-sm text-gray-600">Fluxes</div>
          </div>
        </template>
      </UCard>

      <UCard class="stat-card">
        <template #header>
          <div class="text-center">
            <div class="text-2xl font-bold">{{ stats.reactionCount || 0 }}</div>
            <div class="text-sm text-gray-600">Reactions</div>
          </div>
        </template>
      </UCard>

      <UCard class="stat-card">
        <template #header>
          <div class="text-center">
            <div class="text-2xl font-bold">{{ stats.boostCount || 0 }}</div>
            <div class="text-sm text-gray-600">Boosts</div>
          </div>
        </template>
      </UCard>

      <UCard class="stat-card">
        <template #header>
          <div class="text-center">
            <div class="text-2xl font-bold">{{ stats.followerCount || 0 }}</div>
            <div class="text-sm text-gray-600">
              <NuxtLink :to="`/profile/${handle}/connections`">Followers</NuxtLink>
            </div>
          </div>
        </template>
      </UCard>

      <UCard class="stat-card">
        <template #header>
          <div class="text-center">
            <div class="text-2xl font-bold">{{ stats.followingCount || 0 }}</div>
            <div class="text-sm text-gray-600">
              <NuxtLink :to="`/profile/${handle}/connections`">Following</NuxtLink>
            </div>
          </div>
        </template>
      </UCard>

      <UCard class="stat-card">
        <template #header>
          <div class="text-center">
            <div class="text-2xl font-bold">{{ stats.karmaScore || 0 }}</div>
            <div class="text-sm text-gray-600">
              <NuxtLink :to="`/profile/${handle}/karma-history`">Karma Points</NuxtLink>
            </div>
          </div>
        </template>
      </UCard>
    </div>

    <div class="achievements py-6 text-center">
      <h3 class="text-xl font-semibold mb-4">Achievements</h3>
      <div v-if="achievements?.length">
        <ul class="inline-block text-left">
          <li v-for="achievement in achievements" :key="achievement.name" class="mb-2">
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
  </div>
</template>

<script lang="ts" setup>
import type { Achievement, FluxUserStats } from '@/utils/types'

defineProps<{
  handle: string
  stats: FluxUserStats
  achievements: Achievement[]
}>()
</script>

<style></style>