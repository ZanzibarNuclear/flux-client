export function useAuthService() {
  const loading = ref(false)
  const error = ref(null)
  const config = useRuntimeConfig()



  return {
    loading,
    error,
  }
}
