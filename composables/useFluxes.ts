export function useFluxes() {
  const fluxes = ref([])
  const loading = ref(false)
  const error = ref(null)

  interface FetchOptions {
    filter?: string;
    author?: string | null;
  }

  const fetchFluxes = async (options: FetchOptions = {}) => {
    const { filter = 'recent', author = null } = options
    loading.value = true
    error.value = null

    try {
      const query = new URLSearchParams()
      if (filter) query.append('filter', filter)
      if (author) query.append('author', author)

      const data = await $fetch(`/api/fluxes?${query.toString()}`)
      fluxes.value = data
    } catch (err) {
      console.error('Error fetching fluxes:', err)
    } finally {
      loading.value = false
    }
  }

  return {
    fluxes,
    loading,
    error,
    fetchFluxes
  }
}