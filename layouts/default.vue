<template>
  <div class="app-container">
    <Header />
    <div class="main-content">
      <Sidebar />
      <main class="page-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import Header from '~/components/Layout/Header.vue'
import Sidebar from '~/components/Layout/Sidebar.vue'
</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
}

.main-content {
  display: flex;
}

.page-content {
  flex-grow: 1;
  padding: 0 20px;
}
</style>