<template>
  <div class="flux-composer">
    <textarea v-model="fluxContent" placeholder="What's nu(-clear)?"></textarea>
    <button @click="postFlux">Flux it</button>
  </div>
</template>

<script setup>
const fluxContent = ref('')

function postFlux() {
  // Here you would typically send the flux to your backend
  console.log('Posting flux:', fluxContent.value)
  fluxContent.value = '' // Clear the input after posting
}
</script>

<style scoped>
.flux-composer {
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #e1e8ed;
  border-radius: 5px;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #1da1f2;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}
</style>