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

const BODY_SHELL_CLASS = "owd-has-nuxt-shell";

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

    <!--
      `isolate` keeps every window's z-index inside this stacking context, so the
      system bar and the launcher (siblings) always stay above open windows
      instead of losing to the window manager's 100+ z-index values.
    -->
    <div ref="shellStageRef" class="flex-1 min-h-0 relative flex flex-col isolate">
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
  --owd-system-bar-height: 60px;
}

/* Desktop shell: no document scrollbars — scroll only inside windows/apps */
.owd-desktop--nuxt,
.owd-has-nuxt-shell {
  overscroll-behavior: none;
}

/*
 * Window content layout. The core renders the `desktop-window__content` element
 * and adds `--centered` / `--padded` when a window is opened with
 * `:content="{ centered: true, padded: true }"`. These rules must be global
 * (the element is the child component root, so scoped `:deep` does not match).
 */
.owd-desktop--nuxt .desktop-window__content {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
}

.owd-desktop--nuxt .desktop-window__content--centered {
  justify-content: center;
  align-items: center;
  text-align: center;
}

.owd-desktop--nuxt .desktop-window__content--centered > * {
  max-width: 100%;
}

.owd-desktop--nuxt .desktop-window__content--padded {
  padding: 12px;
}

/* Thin, unobtrusive scrollbars inside windows and the launcher */
.owd-desktop--nuxt .desktop-window__content,
.owd-desktop--nuxt .owd-desktop__scroll {
  scrollbar-width: thin;
  scrollbar-color: rgb(0 0 0 / 0.18) transparent;
}

.owd-desktop--nuxt .desktop-window__content::-webkit-scrollbar,
.owd-desktop--nuxt .owd-desktop__scroll::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.owd-desktop--nuxt .desktop-window__content::-webkit-scrollbar-track,
.owd-desktop--nuxt .owd-desktop__scroll::-webkit-scrollbar-track {
  background: transparent;
}

.owd-desktop--nuxt .desktop-window__content::-webkit-scrollbar-thumb,
.owd-desktop--nuxt .owd-desktop__scroll::-webkit-scrollbar-thumb {
  background-color: rgb(0 0 0 / 0.18);
  border: 3px solid transparent;
  background-clip: padding-box;
  border-radius: 9999px;
}

.owd-desktop--nuxt .desktop-window__content::-webkit-scrollbar-thumb:hover,
.owd-desktop--nuxt .owd-desktop__scroll::-webkit-scrollbar-thumb:hover {
  background-color: rgb(0 0 0 / 0.3);
}

.owd-desktop--nuxt.dark .desktop-window__content,
.owd-desktop--nuxt.dark .owd-desktop__scroll,
.dark .owd-desktop--nuxt .desktop-window__content,
.dark .owd-desktop--nuxt .owd-desktop__scroll {
  scrollbar-color: rgb(255 255 255 / 0.22) transparent;
}

.dark .owd-desktop--nuxt .desktop-window__content::-webkit-scrollbar-thumb,
.dark .owd-desktop--nuxt .owd-desktop__scroll::-webkit-scrollbar-thumb {
  background-color: rgb(255 255 255 / 0.22);
}
</style>
