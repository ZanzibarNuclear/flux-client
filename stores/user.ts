import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const userId = ref<string | null>(null)
  const alias = ref<string | null>(null)

  function setCurrentUser(userInfo: { id: string, alias: string }) {
    userId.value = userInfo.id
    alias.value = userInfo.alias
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
