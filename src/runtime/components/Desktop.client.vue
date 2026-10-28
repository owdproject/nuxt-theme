<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useDesktopWorkArea } from "@owdproject/nuxt/runtime/composables/useDesktopWorkArea";
import Background from "./Background/DesktopBackground.vue";
import DesktopContent from "./Desktop/DesktopContent.vue";
import NuxtTopBar from "./NuxtTopBar.vue";
import NuxtLauncherOverlay from "./NuxtLauncherOverlay.vue";

defineProps({
  systemBar: { type: null, required: false },
});

const shellStageRef = ref(null);
useDesktopWorkArea(shellStageRef);

const BODY_SHELL_CLASS = "owd-has-nuxt-desktop";

onMounted(() => {
  document.body.classList.add(BODY_SHELL_CLASS);
});

onUnmounted(() => {
  document.body.classList.remove(BODY_SHELL_CLASS);
});
</script>

<template>
  <DesktopCore
    v-bind="$props"
    class="owd-desktop--nuxt flex flex-col h-screen overflow-hidden select-none bg-gray-50 dark:bg-gray-950"
  >
    <NuxtTopBar />

    <div ref="shellStageRef" class="flex-1 min-h-0 relative flex flex-col">
      <Background />

      <DesktopContent>
        <slot />
      </DesktopContent>
      <DesktopCoreApplicationRender />
    </div>

    <NuxtLauncherOverlay />

    <!-- Supports programmatically opened Nuxt UI modals -->
    <UModals />
  </DesktopCore>
</template>

<style>
/* Custom style rules for desktop shell */
.owd-desktop--nuxt {
  --owd-system-bar-height: 48px;
}
</style>
