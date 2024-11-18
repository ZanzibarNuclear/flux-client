interface FluxListContext {
  filter: string | null
  author: string | null
  limit: number
  offset: number
  hasMore: boolean
  total?: number
}

export interface FetchFluxOptions {
  filter?: string
  author?: string | null
  limit?: number
  reset?: boolean  // If true, reset the context and start fresh
}

export function useFluxService() {
  const fluxStore = useFluxStore()
  const userStore = useUserStore()
  const api = useApi()
  const loading = ref(false)
  const error = ref(null)

  const currentContext = ref<FluxListContext>({
    filter: null,
    author: null,
    limit: 5,
    offset: 0,
    hasMore: true,
  })

  const fetchFluxes = async (options: FetchFluxOptions = {}) => {
    const {
      filter = 'recent',
      author = null,
      limit = 5,
      reset = false
    } = options

    loading.value = true
    error.value = null

    try {
      // Reset context if requested or if filter/author changed
      if (reset || filter !== currentContext.value.filter || author !== currentContext.value.author) {
        currentContext.value = {
          filter,
          author,
          limit,
          offset: 0,
          hasMore: true,
        }
      }

      // Don't fetch if we know there are no more results
      if (!currentContext.value.hasMore) {
        return []
      }

      const query = new URLSearchParams()
      if (currentContext.value.filter) {
        query.append('filter', currentContext.value.filter)
      }
      if (currentContext.value.author) {
        query.append('author', currentContext.value.author)
      }
      query.append('limit', currentContext.value.limit.toString())
      query.append('offset', currentContext.value.offset.toString())

      const response = await api.get(`/api/fluxes?${query.toString()}`)
      const { items, total, hasMore } = response as { items: Flux[], total: number, hasMore: boolean }

      // Update the context
      currentContext.value.hasMore = hasMore
      currentContext.value.total = total
      currentContext.value.offset += items?.length || 0

      // Append or replace items in the store
      if (reset) {
        fluxStore.setTimeline(items as Flux[])
      } else {
        fluxStore.appendToTimeline(items as Flux[])
      }

      return items
    } catch (err: any) {
      console.error('Error fetching fluxes:', err)
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const loadMoreFluxes = () => {
    return fetchFluxes({
      filter: currentContext.value.filter,
      author: currentContext.value.author,
      limit: currentContext.value.limit
    })
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


  /**
   * Fetch any Flux user profile by their handle
   */
  const fetchFluxProfile = async (userHandle: string) => {
    const data = await api.get(`/api/flux-users/${userHandle}`)
    return data as FluxProfile
  }

  /*
   * Protected actions - require the user to be signed in
   */

  const createFlux = async (content: string, parentId: string | null = null) => {
    if (!userStore.isSignedIn) {
      console.warn('User not signed in -- cannot create flux')
      return
    }
    const data = await api.post('/api/fluxes', {
      content,
      parentId,
    })
    console.log('returned new flux:', data)
    return data
  }

  const boostFlux = async (fluxId: number) => {
    if (!userStore.isSignedIn) {
      console.warn('User not signed in -- cannot boost flux')
      return
    }
    const data = await api.post(`/api/fluxes/${fluxId}/boost`, {})
    return data
  }

  const deboostFlux = async (fluxId: number) => {
    if (!userStore.isSignedIn) {
      console.warn('User not signed in -- cannot deboost flux')
      return
    }
    const data = await api.delete(`/api/fluxes/${fluxId}/boost`)
    return data
  }

  /**
   * Fetch the current user's Flux profile
   */
  const fetchMyFluxProfile = async () => {
    if (!userStore.isSignedIn) {
      console.warn('User not signed in -- cannot fetch my flux profile')
      return
    }
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
    if (!userStore.isSignedIn) {
      console.warn('User not signed in -- cannot create my flux profile')
      return
    }
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

  return {
    loading,
    error,
    fetchFluxes,
    fetchReactions,
    createFlux,
    fetchFluxProfile,
    isHandleAvailable,
    createMyFluxProfile,
    fetchMyFluxProfile,
    boostFlux,
    loadMoreFluxes,
    currentContext: readonly(currentContext)
  }
}
