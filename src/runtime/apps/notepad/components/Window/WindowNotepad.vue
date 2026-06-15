<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  window: any
}>()

const text = ref('')

function clear() {
  text.value = ''
}
</script>

<template>
  <DesktopWindow :window="window" class="h-full bg-white dark:bg-gray-950 flex flex-col">
    <!-- Toolbar -->
    <div class="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
      <UButton
        icon="i-heroicons-document"
        label="New"
        color="gray"
        variant="ghost"
        size="xs"
        @click="clear"
      />
      <UButton
        icon="i-heroicons-trash"
        label="Clear"
        color="red"
        variant="ghost"
        size="xs"
        @click="clear"
      />
    </div>

    <!-- Text area -->
    <div class="flex-1 min-h-0">
      <textarea
        v-model="text"
        class="w-full h-full p-4 resize-none outline-none border-0 text-sm font-mono bg-transparent text-gray-800 dark:text-gray-200"
        placeholder="Type here..."
      />
    </div>
  </DesktopWindow>
</template>
