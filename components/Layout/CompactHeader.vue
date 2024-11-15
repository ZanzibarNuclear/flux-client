<template>
  <header class="app-header fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
    <div class="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
      <NuxtImg src="/images/logo-sq-smooth.jpg" alt="World of Nuclear Logo" class="w-12 h-12 -mt-4" />
      <h1 class="text-x3l font-bold text-[nuclear-blue]">Flux on World of Nuclear</h1>
      <UButton icon="i-ph-list-bold" color="white" class="-mt-3" />
    </div>
  </header>
</template>

<script lang="ts" setup>

</script>

<style>
.app-header {
  transition: top 0.3s;
  position: fixed;
  top: 0;
  width: 100%;
  height: 75px;
  /* Match the image height */
  z-index: 10;

  /* Add background image */
  /* background-image: url('/images/lush-landscape-1024x75.jpg'); */
  background-image: url('/images/electric-sky-banner-768x100.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>