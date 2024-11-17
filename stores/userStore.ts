import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', () => {
  const id = ref<string | null>(null)
  const alias = ref<string | null>(null)
  const roles = ref<string[] | null>(null)

  function setCurrentUser(userInfo: { id: string, alias: string, roles: string[] }) {
    id.value = userInfo.id
    alias.value = userInfo.alias
    roles.value = userInfo.roles
  }

  const isSignedIn = computed(() => !!id.value)

  function clearCurrentUser() {
    id.value = null
    alias.value = null
    roles.value = null
  }

  return {
    id,
    alias,
    setCurrentUser,
    clearCurrentUser,
    isSignedIn
  }
})
