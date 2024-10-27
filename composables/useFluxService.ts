export function useFluxService() {
  const fluxStore = useFluxStore()
  const api = useApi()
  const loading = ref(false)
  const error = ref(null)
  const config = useRuntimeConfig()

  interface FetchFluxOptions {
    filter?: string
    author?: string | null
  }

  const fetchFluxes = async (options: FetchFluxOptions = {}) => {
    const { filter = 'recent', author = null } = options
    loading.value = true
    error.value = null

    try {
      const query = new URLSearchParams()
      if (filter) query.append('filter', filter)
      if (author) query.append('author', author)
      const data = await api.get(`/api/fluxes?${query.toString()}`)
      fluxStore.setTimeline(data as Flux[])
    } catch (err) {
      console.error('Error fetching fluxes:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchReactions = async (fluxId: string) => {
    loading.value = true
    error.value = null
    try {
      const data = await api.get(`/api/fluxes/${fluxId}/replies`)
      fluxStore.setReactions(data as Flux[])
    } catch (err) {
      console.error('Error fetching reactions:', err)
    } finally {
      loading.value = false
    }
  }

  const createFlux = async (fluxData: Flux) => {
    const data = await api.post('/api/fluxes', fluxData)
    return data
  }

  const boostFlux = async (fluxId: string) => {
    const data = await api.post(`api/fluxes/${fluxId}/boost`, {})
    return data
  }

  /**
   * Fetch the current user's Flux profile
   */
  const fetchMyFluxProfile = async () => {
    try {
      loading.value = true
      const data = await api.get('/api/me/flux-profile')
      if (data) {
        fluxStore.setProfile(data as FluxProfile)
      }
    } catch (err) {
      if (err instanceof Error) {
        const error = err as Error & { response?: { status: number } };
        if (error.response && error.response.status === 404) {
          console.log('Current user does not have a Flux profile')
          return
        }
      }
      console.error('Error fetching flux profile:', err)
    } finally {
      loading.value = false
    }
  }

  const isHandleAvailable = async (handle: string) => {
    const data = await api.get(`/api/flux-users/${handle}`)
    console.log('is handle available:', data)
    return !data
  }

  const createMyFluxProfile = async (handle: string, displayName: string) => {
    try {
      loading.value = true
      const data = await api.post('/api/me/flux-profile', {
        handle,
        displayName,
      })
      if (data) {
        fluxStore.setProfile(data as FluxProfile)
      }
      return data
    } catch (err) {
      console.error('Error creating my flux profile:', err)
    } finally {
      loading.value = false
    }
  }

  /**
   * Fetch any Flux user profile by their handle
   */
  const fetchFluxProfile = async (userHandle: string) => {
    const data = await api.get(`/api/flux-users/${userHandle}`)
    return data as FluxProfile
  }

  return {
    loading,
    error,
    fetchFluxes,
    fetchReactions,
    createFlux,
    fetchFluxProfile,
    checkFluxHandleAvailability: isHandleAvailable,
    createMyFluxProfile,
    fetchMyFluxProfile,
    boostFlux
  }
}
