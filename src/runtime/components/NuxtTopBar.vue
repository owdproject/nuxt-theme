<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useColorMode } from '#imports'
import { useNuxtStartMenu } from '../composables/useNuxtStartMenu'

const { toggle: toggleStart, open: startOpen } = useNuxtStartMenu()

const time = ref('')
const dateLabel = ref('')
let timer: any

onMounted(() => {
  const update = () => {
    const d = new Date()
    time.value = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    dateLabel.value = d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
  }
  update()
  timer = setInterval(update, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})

const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<template>
  <header class="h-[60px] w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white/75 dark:bg-gray-900/75 backdrop-blur border-b border-gray-200 dark:border-gray-800 flex-shrink-0 select-none z-50">
    <!-- Left Section: Logo/Start Button -->
    <div class="flex items-center gap-4">
      <button 
        @click="toggleStart"
        class="flex items-center gap-2 hover:opacity-80 transition-opacity"
        aria-label="Toggle Start Menu"
      >
        <UIcon name="i-heroicons-cube-transparent" class="w-6 h-6 text-green-500" />
        <span class="font-bold text-gray-900 dark:text-white text-lg tracking-tight hidden sm:block">Nuxt Desktop</span>
      </button>
    </div>

    <!-- Center Section: Title/Clock -->
    <div class="flex flex-col items-center justify-center">
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ time }}</span>
      <span class="text-xs text-gray-500 dark:text-gray-400">{{ dateLabel }}</span>
    </div>

    <!-- Right Section: Quick controls -->
    <div class="flex items-center gap-3">
      <UButton
        :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'"
        color="gray"
        variant="ghost"
        class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        @click="isDark = !isDark"
      />
    </div>
  </header>
</template>
