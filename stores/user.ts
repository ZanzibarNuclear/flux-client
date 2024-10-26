import { defineStore } from 'pinia'

export type UserCredentials = {
  userId: string
  alias: string
}
export const useUserStore = defineStore('userStore', () => {
  const credentials = ref<UserCredentials | null>(null)

  function setCredentials(newCredentials: UserCredentials) {
    credentials.value = newCredentials
  }

  const isSignedIn = computed(() => !!credentials.value)

  return {
    credentials,
    setCredentials,
    isSignedIn
  }
})
