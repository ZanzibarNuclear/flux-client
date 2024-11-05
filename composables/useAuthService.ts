export function useAuthService() {
  const userStore = useUserStore()

  const loading = ref(false)
  const error = ref<Error | null>(null)

  const loginWithOAuth = async (provider: string) => {
    navigateTo(`${useRuntimeConfig().public.apiBaseUrl}/login/${provider}`, {
      external: true
    })
  }

  const getCurrentUser = async () => {
    try {
      const api = useApi()

      loading.value = true
      const userData = await api.get('/api/me')

      console.log('found current user:', userData)
      userStore.setCurrentUser(userData as { id: string, alias: string, roles: string[] })
      return userData
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err
        console.error('Error fetching user info', err.message)
      } else {
        error.value = new Error('An unknown error occurred')
        console.error('Error fetching user info', err)
      }
    } finally {
      loading.value = false
    }
  }

  const findIdentity = async (provider: string) => {
    await getCurrentUser()
    if (!userStore.isSignedIn) {
      console.log('Did not find user with active session. Attempting OAuth login.')
      await loginWithOAuth(provider)
    }
  }

  return {
    loading,
    error,
    loginWithOAuth,
    getCurrentUser,
    findIdentity
  }
}
