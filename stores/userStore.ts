import { defineStore } from 'pinia'
import type { UserPreferences } from '@/utils/types'

export const useUserStore = defineStore('userStore', () => {
  const id = ref<string | null>(null)
  const alias = ref<string | null>(null)
  const roles = ref<string[] | null>(null)
  const preferences = ref<UserPreferences | null>(null)

  function setCurrentUser(userInfo: { id: string, alias: string, roles: string[] }) {
    id.value = userInfo.id
    alias.value = userInfo.alias
    roles.value = userInfo.roles
  }

  function setUserPreferences(userPreferences: UserPreferences) {
    preferences.value = userPreferences
  }

  const userProfile = computed(() => ({
    id: id.value,
    alias: alias.value,
    roles: roles.value,
    preferences: preferences.value
  }))

  const isSignedIn = computed(() => !!id.value)

  function clearCurrentUser() {
    id.value = null
    alias.value = null
    roles.value = null
  }

  return {
    id,
    alias,
    roles,
    preferences,
    userProfile,
    isSignedIn,
    setCurrentUser,
    setUserPreferences,
    clearCurrentUser
  }
})
