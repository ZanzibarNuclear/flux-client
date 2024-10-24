export function useAuthService() {
  const loading = ref(false)
  const error = ref(null)
  const config = useRuntimeConfig()

  // TODO: keep context of the current user

  const loginWithOAuth = async (provider: string) => {
    console.log(`useAuthService.loginWithOAuth provider: ${provider} host: ${config.public.apiRootUrl}`)
    navigateTo(`${config.public.apiRootUrl}/login/${provider}`, {
      external: true
    })
  }

  return {
    loading,
    error,
    loginWithOAuth
  }
}
