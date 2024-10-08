<template>
  <div>
    <div v-if="!showThread">
      <FluxTimeline :fluxes="fluxes" @see-thread="openThread" />
    </div>
    <FluxThread v-else :thread-id="currentThreadId" @close="closeThread" />
  </div>
</template>

<script setup>
const showThread = ref(false)
const currentThreadId = ref(null)

function openThread(fluxId) {
  currentThreadId.value = fluxId
  showThread.value = true
}

function closeThread() {
  showThread.value = false
  currentThreadId.value = null
}

// Your existing code to fetch and manage fluxes
const fluxes = ref([/* ... */])
</script>