export function useFluxes() {
  const fluxes = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchFluxes = async () => {
    loading.value = true
    error.value = null

    try {
      const data = await $fetch('/api/fluxes')
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