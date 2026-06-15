<script setup lang="ts">
import { useWindowDragHandlers } from "@owdproject/core/runtime/composables/useWindowDragHandlers"
const props = defineProps({
  config: { type: null, required: false },
  window: { type: null, required: false },
  content: { type: null, required: false }
})
const { onDragStart, onDragEnd } = useWindowDragHandlers(
  () => props.window
)
</script>

<template>
  <DesktopCoreWindow
    v-bind="$props"
    v-show="window?.state?.active !== false"
    @drag:start="onDragStart"
    @drag:end="onDragEnd"
  >
    <div class="flex flex-col h-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl overflow-hidden">
      <DesktopWindowNav>
        <template #prepend>
          <slot name="nav-prepend" />
        </template>
        <template #append>
          <slot name="nav-append" />
        </template>
      </DesktopWindowNav>
      <div class="flex-1 min-h-0 relative">
        <DesktopWindowContent>
          <slot />
        </DesktopWindowContent>
      </div>
    </div>
  </DesktopCoreWindow>
</template>

<style scoped>
.owd-window {
  box-sizing: border-box;
  min-width: 160px;
  min-height: 160px;
}
</style>
