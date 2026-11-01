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
  <DesktopWindow :window="window">
    <div class="flex h-full min-h-0 flex-col bg-white dark:bg-gray-950">
      <!-- Toolbar -->
      <div
        class="flex flex-shrink-0 items-center gap-2 border-b border-gray-200 bg-gray-50 p-2 dark:border-gray-800 dark:bg-gray-900"
      >
        <UButton
          icon="i-heroicons-document"
          label="New"
          color="gray"
          variant="ghost"
          size="xs"
          class="gap-2"
          @click="clear"
        />
        <UButton
          icon="i-heroicons-trash"
          label="Clear"
          color="red"
          variant="ghost"
          size="xs"
          class="gap-2"
          @click="clear"
        />
      </div>

      <!-- Text area -->
      <textarea
        v-model="text"
        class="w-full flex-1 min-h-0 resize-none border-0 bg-transparent p-4 font-mono text-sm text-gray-800 outline-none dark:text-gray-200"
        placeholder="Type here..."
      />
    </div>
  </DesktopWindow>
</template>
