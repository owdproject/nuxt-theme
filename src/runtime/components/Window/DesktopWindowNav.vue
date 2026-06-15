<script setup lang="ts">
import { inject, computed } from "vue"
import { useToggleWindowMaximize } from "@owdproject/core/runtime/composables/useToggleWindowMaximize"

const windowController = inject<any>("windowController")
const toggleWindowMaximize = useToggleWindowMaximize()

function onWindowMinimize() {
  if (!windowController?.instanced) return
  windowController.actions.minimize()
}

function onWindowMaximize() {
  toggleWindowMaximize(windowController)
}

function onWindowNavDestroy() {
  if (!windowController?.instanced) return
  windowController.actions.destroy()
}

const dropdownItems = computed(() => [
  [
    {
      label: 'Minimize',
      icon: 'i-heroicons-minus',
      click: onWindowMinimize
    },
    {
      label: windowController?.state?.maximized ? 'Restore' : 'Maximize',
      icon: 'i-heroicons-squares-2x2',
      click: onWindowMaximize
    }
  ],
  [
    {
      label: 'Close',
      icon: 'i-heroicons-x-mark',
      click: onWindowNavDestroy
    }
  ]
])
</script>

<template>
  <DesktopCoreWindowNav
    class="flex items-center justify-between px-3 py-1.5 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 select-none cursor-default"
    @dblclick="onWindowMaximize"
  >
    <div class="flex items-center space-x-2 min-w-0">
      <UDropdown :items="dropdownItems" :popper="{ placement: 'bottom-start' }">
        <UButton
          v-if="windowController?.icon"
          :icon="windowController.icon"
          color="gray"
          variant="ghost"
          size="2xs"
          class="h-5 w-5 p-0 flex items-center justify-center rounded"
        />
        <UButton
          v-else
          icon="i-heroicons-cog-6-tooth"
          color="gray"
          variant="ghost"
          size="2xs"
          class="h-5 w-5 p-0 flex items-center justify-center rounded"
        />
      </UDropdown>

      <div
        v-if="windowController?.title"
        class="text-xs font-semibold text-gray-700 dark:text-gray-300 truncate"
        v-text="windowController?.title"
      />
    </div>

    <div class="flex items-center space-x-1 flex-shrink-0">
      <UButton
        v-if="!windowController?.instanced || windowController?.isMinimizable"
        icon="i-heroicons-minus"
        size="2xs"
        color="gray"
        variant="ghost"
        class="h-5 w-5 p-0 flex items-center justify-center rounded"
        @mousedown.stop
        @click.stop="onWindowMinimize"
      />
      <UButton
        v-if="windowController?.isMaximizable"
        icon="i-heroicons-squares-2x2"
        size="2xs"
        color="gray"
        variant="ghost"
        class="h-5 w-5 p-0 flex items-center justify-center rounded"
        @mousedown.stop
        @click.stop="onWindowMaximize"
      />
      <UButton
        v-if="!windowController?.instanced || windowController?.isDestroyable"
        icon="i-heroicons-x-mark"
        size="2xs"
        color="red"
        variant="ghost"
        class="h-5 w-5 p-0 flex items-center justify-center rounded hover:bg-red-500 hover:text-white"
        @mousedown.stop
        @click.stop="onWindowNavDestroy"
      />
    </div>
  </DesktopCoreWindowNav>
</template>
