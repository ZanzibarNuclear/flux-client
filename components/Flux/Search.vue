<template>
  <div class="search-container">
    <input v-model="searchQuery" @input="handleSearch" type="text" placeholder="Search Fluxes..." class="search-input">
    <button @click="handleSearch" class="search-button">Search</button>
  </div>
</template>

<script setup>
const searchQuery = ref('')
const emit = defineEmits(['search'])

function handleSearch() {
  emit('search', searchQuery.value)
}
</script>

<style scoped>
.search-container {
  display: flex;
  margin-bottom: 20px;
}

.search-input {
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 20px 0 0 20px;
  outline: none;
}

.search-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #1da1f2;
  color: white;
  border: none;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
}

.search-button:hover {
  background-color: #1a91da;
}
</style>