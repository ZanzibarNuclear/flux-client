<template>
  <div class="pb-28">
    <template v-if="fluxStore.activeFlux">
      <FluxComposer
        v-if="fluxStore.isReply"
        :replying-to="fluxStore.activeFlux"
        @cancel-reply="handleCancelReply" />
      <FluxView
        :flux="fluxStore.activeFlux"
        @reply-to-flux="handleReply"
        @view-flux="handleViewFlux" />
    </template>
    <template v-else>
      <div class="py-8">
        <FluxComposer v-if="fluxStore.hasProfile" />
        <div v-else>
          <NuxtImg src="/images/flux-theme-v1.jpg" class="mx-auto" />
          <NuxtLink to="/join" class="block text-center text-lg text-[nuclear]"
            >Sign in to participate.</NuxtLink
          >
        </div>
        <hr />
      </div>
      <FluxTimelineScroller />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Flux } from "@/utils/types";

const fluxStore = useFluxStore();

const handleCancelReply = () => {
  fluxStore.cancelReply();
};

const handleViewFlux = (flux: Flux) => {
  fluxStore.setActiveFlux(flux);
};

const handleReply = (flux: Flux) => {
  fluxStore.setActiveFlux(flux, true);
};
</script>

<style scoped></style>
