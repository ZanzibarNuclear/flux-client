import { defineStore } from 'pinia'
import type { UserProfile } from '@/utils/types'

export const useUserStore = defineStore('userStore', () => {
  const creds = ref<UserCredentials | null>()
  const profile = ref<UserProfile | null>()
  const id = computed(() => creds.value?.id)
  const alias = computed(() => creds.value?.alias)
  const isSignedIn = computed(() => !!id.value)
  const hasRole = (role: string) => computed(() => creds.value?.roles.includes(role))

  function setActiveUser(userInfo: UserCredentials) {
    creds.value = { ...userInfo }
    // profile must be for active user
    if (profile.value && profile.value.id !== userInfo.id) {
      profile.value = null
    }
  }

  function setUserProfile(userProfile: UserProfile) {
    if (userProfile.id !== id.value) {
      console.warn('User profile ID does not match active user ID. Ignoring.')
    }
    profile.value = { ...userProfile }
  }

  function clearActiveUser() {
    creds.value = null
    profile.value = null
  }

  return {
    id,
    alias,
    isSignedIn,
    hasRole,
    setActiveUser,
    clearActiveUser,
    profile,
    setUserProfile
  }
})
