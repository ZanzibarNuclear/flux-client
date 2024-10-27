export const useApi = () => {
  return {
    get: async (url: string) => await $fetch(`${useRuntimeConfig().public.apiBaseUrl}${url}`, {
      credentials: 'include',
    }),
    post: async (url: string, data: any) => {
      console.log(`posting to ${url}:`, data)
      return await $fetch(`${useRuntimeConfig().public.apiBaseUrl}${url}`, {
        method: 'POST',
        body: data,
        credentials: 'include', // This is crucial for sending cookies
      })
    },
  }
}
