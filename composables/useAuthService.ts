export function useAuthService() {
  const userStore = useUserStore()
  const config = useRuntimeConfig()

  const loading = ref(false)
  const userInfo = ref(null)
  const error = ref(null)

  const isSignedIn = computed(() => !!userInfo.value)
  // TODO: keep context of the current user

  const loginWithOAuth = async (provider: string) => {
    console.log(`useAuthService.loginWithOAuth provider: ${provider} host: ${config.public.apiRootUrl}`)
    navigateTo(`${config.public.apiRootUrl}/login/${provider}`, {
      external: true
    })
  }

  const fetchUserInfo = async () => {
    const apiRootUrl = config.public.apiRootUrl
    console.log(`useAuthService.fetchUserInfo apiRootUrl: ${apiRootUrl}`)
    const out = await $fetch(`http://localhost:3030/api/me`)
    if (out) {
      userStore.setCredentials(out as UserCredentials)
    } else {
      console.log('User is not signed in')
    }
  }

  return {
    loading,
    error,
    loginWithOAuth,
    isSignedIn,
    fetchUserInfo,
  }
}
