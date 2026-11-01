<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useNuxtStartMenu } from '../composables/useNuxtStartMenu'

const { open, searchQuery, filteredEntries, close, launchEntry } =
  useNuxtStartMenu()

const searchInput = ref<HTMLInputElement | null>(null)

watch(open, (isOpen) => {
  if (isOpen) {
    // Wait for the panel to be mounted before focusing the field.
    setTimeout(() => searchInput.value?.focus(), 50)
  }
})

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && open.value) {
    close()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Transition
    enter-active-class="transition duration-150 ease-out"
    enter-from-class="opacity-0 -translate-y-1"
    leave-active-class="transition duration-100 ease-in"
    leave-to-class="opacity-0 -translate-y-1"
  >
    <div
      v-if="open"
      class="fixed inset-0 z-40 flex items-start justify-center pt-24"
      @click="close"
    >
      <!-- Overlay scrim -->
      <div class="absolute inset-0 bg-gray-950/10 dark:bg-black/40" />

      <!-- Command palette -->
      <div
        class="relative w-full max-w-xl mx-4 flex flex-col bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl overflow-hidden"
        @click.stop
      >
        <!-- Search -->
        <div class="p-3 border-b border-gray-200 dark:border-gray-800">
          <div
            class="flex items-center gap-2.5 h-11 px-3.5 rounded-lg bg-gray-100/80 dark:bg-gray-800/60 ring-1 ring-inset ring-transparent focus-within:ring-primary-500/60 focus-within:bg-white dark:focus-within:bg-gray-900 transition"
          >
            <UIcon
              name="i-heroicons-magnifying-glass"
              class="w-4 h-4 flex-shrink-0 text-gray-400 dark:text-gray-500"
            />
            <input
              ref="searchInput"
              v-model="searchQuery"
              type="text"
              placeholder="Search apps..."
              autocomplete="off"
              spellcheck="false"
              class="flex-1 min-w-0 h-full bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
          </div>
        </div>

        <!-- Results -->
        <div class="flex-1 overflow-y-auto owd-desktop__scroll max-h-[50vh] p-2">
          <div
            v-if="filteredEntries.length === 0"
            class="text-center py-12 text-gray-500 dark:text-gray-400 text-sm"
          >
            No apps found.
          </div>

          <div class="grid grid-cols-1 gap-0.5">
            <button
              v-for="entry in filteredEntries"
              :key="entry.application.id"
              class="group flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-100/70 dark:hover:bg-gray-800/60 focus:bg-gray-100/70 dark:focus:bg-gray-800/60 focus:outline-none transition-colors text-left"
              @click="launchEntry(entry)"
            >
              <div
                class="flex-shrink-0 flex items-center justify-center w-9 h-9 bg-gray-100 dark:bg-gray-800 rounded-md group-hover:bg-white dark:group-hover:bg-gray-900 transition-colors"
              >
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
                <span
                  class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate"
                >
                  {{ entry.title }}
                </span>
                <span
                  v-if="entry.description"
                  class="text-xs text-gray-500 dark:text-gray-400 truncate"
                >
                  {{ entry.description }}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
