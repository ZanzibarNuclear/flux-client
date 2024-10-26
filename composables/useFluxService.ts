export function useFluxService() {
  const fluxStore = useFluxStore()
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
      const data = await $fetch(`${config.public.apiRootUrl}/api/fluxes?${query.toString()}`, {
        mode: 'no-cors'
      })
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
      const data = await $fetch(`${config.public.apiRootUrl}/api/fluxes/${fluxId}/replies`)
      fluxStore.setReactions(data as Flux[])
    } catch (err) {
      console.error('Error fetching reactions:', err)
    } finally {
      loading.value = false
    }
  }

  const createFlux = async (fluxData: Flux) => {
    fetch(`${config.public.apiRootUrl}/api/fluxes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fluxData)
    })
      .then(response => response.json())
      .then(data => {
        return data
      })
      .catch(error => {
        console.error('Error posting flux:', error)
      })
  }

  const boostFlux = async (fluxId: string) => {
    const data = await $fetch(`${config.public.apiRootUrl}/api/fluxes/${fluxId}/boost`, {
      method: 'POST',
    })
    return data
  }

  /**
   * Fetch the current user's Flux profile
   */
  const fetchMyFluxProfile = async () => {
    // must be signed in for this to work
    try {
      const sessionToken = useCookie('session-token')
      if (!sessionToken.value) {
        console.warn('No session token found')
        return
      }
      loading.value = true
      const data = await $fetch(`${config.public.apiRootUrl}/api/me/flux-profile`, {
        credentials: 'include',
        headers: {
          'X-Session-Token': sessionToken.value
        }
      })
      if (data) {
        console.log('setting my flux profile:', data)
        fluxStore.setProfile(data as FluxProfile)
      }
    } catch (err) {
      const error = err as Error & { response?: { status: number } };
      if (error.response && error.response.status === 404) {
        console.log('No flux profile found for user (404 response)')
        // Ignore the 404 error
        return
      }
      // Handle other errors
      console.error('Error fetching flux profile:', err)
    } finally {
      loading.value = false
    }
  }

  const checkFluxHandleAvailability = async (handle: string) => {
    const data = await $fetch(`${config.public.apiRootUrl}/api/flux-users/${handle}`)
    return !data
  }

  const createMyFluxProfile = async (handle: string, displayName: string) => {
    try {
      const sessionToken = useCookie('session-token')
      if (!sessionToken.value) {
        console.warn('No session token found')
        return
      }
      loading.value = true
      const data = await $fetch(`${config.public.apiRootUrl}/api/me/flux-profile`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-Session-Token': sessionToken.value
        },
        body: JSON.stringify({ handle, displayName })
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
    const data = await $fetch(`${config.public.apiRootUrl}/api/flux-users/${userHandle}`)
    return data as FluxProfile
  }

  return {
    loading,
    error,
    fetchFluxes,
    fetchReactions,
    createFlux,
    fetchFluxProfile,
    checkFluxHandleAvailability,
    createMyFluxProfile,
    fetchMyFluxProfile,
    boostFlux
  }
}
