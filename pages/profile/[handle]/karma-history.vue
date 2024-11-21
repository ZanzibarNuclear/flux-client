<template>
  <div class="achievements-page max-w-4xl mx-auto py-8">
    <div class="header mb-8">
      <h1 class="text-2xl font-bold mb-2">Achievements & Karma</h1>
      <UBreadcrumb :links="[
        { label: 'Profile', to: `/profile/${userId}` },
        { label: 'Achievements', to: '#' }
      ]" />
    </div>

    <KarmaHistory v-if="achievements" :achievements="achievements" />

    <UCard v-else class="p-4 text-center text-gray-500">
      Loading achievements...
    </UCard>
  </div>
</template>

<script lang="ts" setup>
import type { Achievement } from '@/utils/types'

const route = useRoute()
const userId = route.params.id as string

// Fetch achievements
const { data: achievements } = await useFetch<Achievement[]>(`/api/users/${userId}/achievements`)
</script>