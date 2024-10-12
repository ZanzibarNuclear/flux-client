<template>
  <UContainer>
    <div class="app-container">
      <LayoutHeader />
      <div class="main-content">
        <LayoutSidebar />
        <main class="page-content">
          <h1 class="text-center">WoN Flux &ndash; Let's get reactive</h1>
          <slot />
        </main>
      </div>
      <LayoutFooter />
    </div>
  </UContainer>
</template>

<script setup>
</script>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  background-color: #f6f2eb;
}

.main-content {
  display: flex;
}

.page-content {
  flex-grow: 1;
  padding: 0 20px;
}
</style>