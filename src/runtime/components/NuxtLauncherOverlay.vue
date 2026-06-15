<script setup lang="ts">
import { useNuxtStartMenu } from '../composables/useNuxtStartMenu'
import { watch, ref } from 'vue'

const { open, searchQuery, filteredEntries, close, launchEntry } = useNuxtStartMenu()
const searchInput = ref<any>(null)

watch(open, (isOpen) => {
  if (isOpen) {
    setTimeout(() => {
      searchInput.value?.$el?.querySelector('input')?.focus()
    }, 100)
  }
})
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-40 flex items-start justify-center pt-24" @click="close">
    <!-- Overlay/Command Palette -->
    <div 
      class="w-full max-w-xl mx-4 flex flex-col bg-white/75 dark:bg-gray-900/75 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl overflow-hidden ring-1 ring-gray-200 dark:ring-gray-800"
      @click.stop
    >
      <div class="p-4 border-b border-gray-200 dark:border-gray-800">
        <UInput
          ref="searchInput"
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass"
          size="lg"
          color="gray"
          variant="none"
          placeholder="Search apps..."
          class="w-full text-lg"
          :ui="{ wrapper: 'shadow-none', icon: { base: 'text-gray-400 dark:text-gray-500' } }"
        />
      </div>

      <div class="flex-1 overflow-y-auto max-h-[50vh] p-2">
        <div v-if="filteredEntries.length === 0" class="text-center py-12 text-gray-500 dark:text-gray-400 text-sm">
          No apps found.
        </div>
        
        <div class="grid grid-cols-1 gap-1">
          <button
            v-for="entry in filteredEntries"
            :key="entry.application.id"
            class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 focus:bg-gray-100/50 dark:focus:bg-gray-800/50 transition-colors text-left outline-none"
            @click="launchEntry(entry)"
          >
            <div class="flex-shrink-0 p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
              <UIcon
                v-if="entry.icon"
                :name="entry.icon"
                class="w-5 h-5 text-gray-700 dark:text-gray-300"
              />
              <UIcon
                v-else
                name="i-heroicons-window"
                class="w-5 h-5 text-gray-700 dark:text-gray-300"
              />
            </div>
            <div class="flex flex-col min-w-0">
              <span class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ entry.title }}</span>
              <span class="text-xs text-gray-500 dark:text-gray-400 truncate" v-if="entry.description">{{ entry.description }}</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
