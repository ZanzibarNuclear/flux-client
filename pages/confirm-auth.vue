<template>
  <div>
    <p v-if="loading">Authenticating...</p>
    <p v-else-if="error">{{ error }}</p>
    <p v-else>Authentication successful! Redirecting...</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSupabaseClient } from '@nuxtjs/supabase/client'

const router = useRouter()
const supabase = useSupabaseClient()
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const { data, error: authError } = await supabase.auth.getSession()

    if (authError) throw authError

    if (data?.session) {
      await router.push('/join')
    } else {
      throw new Error('No session found')
    }
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})
</script>