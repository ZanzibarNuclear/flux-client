<template>
  <header class="app-header fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
    <div class="max-w-7xl mx-auto mt-4 px-4 py-3 flex items-center relative">
      <NuxtImg src="/images/logo-sq-smooth.jpg" alt="World of Nuclear Logo" class="w-12 h-12 -mt-4" />
      <h1 class="absolute left-1/2 -translate-x-1/2 text-x3l font-bold text-[nuclear-blue]">Flux on World of Nuclear
      </h1>
      <AccountWidget class="-mt-3 ml-auto" />
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
  z-index: 10;

  background-image: url('/images/electric-sky-banner-768x100.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>