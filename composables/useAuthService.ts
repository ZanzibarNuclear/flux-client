export function useAuthService() {
  const userStore = useUserStore()
  const config = useRuntimeConfig()

  const loading = ref(false)
  const error = ref<Error | null>(null)

  const loginWithOAuth = async (provider: string) => {
    console.log(`useAuthService.loginWithOAuth provider: ${provider} host: ${config.public.apiRootUrl}`)
    navigateTo(`${config.public.apiRootUrl}/login/${provider}`, {
      external: true
    })
  }

  const getCurrentUser = async () => {
    try {
      const sessionToken = useCookie('session-token')
      if (!sessionToken.value) {
        console.warn('No session token found')
        return
      }
      loading.value = true
      const userData = await $fetch(config.public.apiRootUrl + '/api/me', {
        credentials: 'include',
        headers: {
          'X-Session-Token': sessionToken.value
        }
      })
      userStore.setCurrentUser(userData as { id: string, alias: string })
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

  return {
    loading,
    error,
    loginWithOAuth,
    getCurrentUser,
  }
}
