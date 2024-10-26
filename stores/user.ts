import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const userId = ref<string | null>(null)
  const alias = ref<string | null>(null)

  function setCurrentUser(newCredentials: { userId: string, alias: string }) {
    userId.value = newCredentials.userId
    alias.value = newCredentials.alias
  }

  const isSignedIn = computed(() => !!userId.value)

  function clearCurrentUser() {
    userId.value = null
    alias.value = null
  }

  return {
    userId,
    alias,
    setCurrentUser,
    clearCurrentUser,
    isSignedIn
  }
})
