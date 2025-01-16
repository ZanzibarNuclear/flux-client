<template>
  <header
    class="app-header fixed top-0 left-0 right-0 bg-heroic-uranium dark:bg-heroic-graphite border-b border-gray-200 z-10 min-w-80">
    <div class="max-w-7xl mx-auto mt-4 px-4 py-3 flex items-center relative">
      <NuxtImg
        src="/images/logo/logo_sq_brd_cherenkov_clear.png"
        alt="World of Nuclear Logo"
        class="w-12 h-12 -mt-4" />
      <h1 class="absolute left-1/2 -translate-x-1/2 text-x3l font-bold">
        <UIcon name="i-ph-lightning-duotone" /> Flux
        <UIcon name="i-ph-lightning-duotone" />
      </h1>
      <AccountWidget class="-mt-3 ml-auto" />
    </div>
  </header>
</template>

<script lang="ts" setup></script>

<style>
.app-header {
  transition: top 0.3s;
  position: fixed;
  top: 0;
  width: 100%;
  height: 75px;
  z-index: 10;
}
</style>
