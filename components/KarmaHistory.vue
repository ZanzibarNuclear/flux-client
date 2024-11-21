<template>
  <div class="karma-history">
    <div class="karma-summary mb-8">
      <UCard>
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-xl font-semibold mb-2">Total Karma</h2>
            <UBadge color="green" size="lg">{{ totalKarma }}</UBadge>
          </div>
          <div class="text-right">
            <p class="text-sm text-gray-600">Level {{ calculateLevel(totalKarma) }}</p>
            <p class="text-xs text-gray-500">{{ nextLevelProgress }}</p>
          </div>
        </div>
      </UCard>
    </div>

    <div class="achievements-list">
      <UCard v-for="achievement in sortedAchievements" :key="achievement.id" class="mb-4">
        <div class="flex items-center gap-4">
          <div class="achievement-icon w-12 h-12 flex items-center justify-center rounded-full"
            :class="achievement.awardedAt ? 'bg-green-100' : 'bg-gray-100'">
            <UIcon name="i-ph-trophy-fill" :class="achievement.awardedAt ? 'text-green-600' : 'text-gray-400'"
              size="lg" />
          </div>
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <h3 class="font-medium">{{ achievement.name }}</h3>
              <UBadge :color="achievement.awardedAt ? 'green' : 'gray'">
                +{{ achievement.karmaAwarded }}
              </UBadge>
            </div>
            <p class="text-sm text-gray-600">{{ achievement.description }}</p>
            <p v-if="achievement.awardedAt" class="text-xs text-gray-500 mt-1">
              Awarded {{ formatDate(achievement.awardedAt) }}
            </p>
          </div>
        </div>
      </UCard>

      <div v-if="!achievements.length" class="text-center text-gray-500 py-8">
        No achievements available
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { formatDate } from '@/utils/dateUtils'
import type { Achievement } from '@/utils/types'

const props = defineProps<{
  achievements: Achievement[]
}>()

// Calculate total karma from unlocked achievements
const totalKarma = computed(() => {
  return props.achievements
    .filter(a => a.awardedAt)
    .reduce((sum, a) => sum + a.karmaAwarded, 0)
})

// Sort achievements: unlocked first (by date), then locked (by progress)
const sortedAchievements = computed(() => {
  return [...props.achievements].sort((a, b) => {
    if (a.awardedAt && b.awardedAt) {
      return new Date(b.awardedAt).getTime() - new Date(a.awardedAt).getTime()
    }
    if (a.awardedAt) return -1
    if (b.awardedAt) return 1
    return 0
  })
})

// Calculate user level based on karma score
const calculateLevel = (karma: number = 0) => {
  return Math.floor(Math.sqrt(karma / 100)) + 1
}

// Calculate progress to next level
const nextLevelProgress = computed(() => {
  const currentLevel = calculateLevel(totalKarma.value)
  const nextLevelKarma = (currentLevel ** 2) * 100
  const progress = Math.round((totalKarma.value / nextLevelKarma) * 100)
  return `${progress}% to Level ${currentLevel + 1}`
})
</script>