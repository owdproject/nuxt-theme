<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  window: any
}>()

const display = ref('0')
const equation = ref('')
const isFinished = ref(false)

const buttons = [
  ['C', '(', ')', '/'],
  ['7', '8', '9', '*'],
  ['4', '5', '6', '-'],
  ['1', '2', '3', '+'],
  ['0', '.', '=', '']
]

function handleClick(val: string) {
  if (val === '=') {
    calculate()
  } else if (val === 'C') {
    clear()
  } else if (val === '') {
    // Spacer button
  } else {
    append(val)
  }
}

function append(val: string) {
  if (isFinished.value) {
    display.value = ''
    isFinished.value = false
  }
  if (display.value === '0' && val !== '.') {
    display.value = val
  } else {
    display.value += val
  }
}

function clear() {
  display.value = '0'
  equation.value = ''
  isFinished.value = false
}

function calculate() {
  try {
    const expr = display.value
    // Safe evaluation for basic arithmetic only
    if (/^[0-9+\-*/().\s]+$/.test(expr)) {
      // eslint-disable-next-line no-eval
      const res = eval(expr)
      equation.value = expr + ' ='
      display.value = String(res)
      isFinished.value = true
    } else {
      display.value = 'Error'
    }
  } catch (e) {
    display.value = 'Error'
  }
}
</script>

<template>
  <DesktopWindow :window="window" class="h-full bg-gray-50 dark:bg-gray-950 flex flex-col p-3">
    <!-- Calculator screen -->
    <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-3 mb-3 text-right shadow-inner flex-shrink-0">
      <div class="text-xs text-gray-400 dark:text-gray-500 h-4 mb-0.5 truncate">{{ equation }}</div>
      <div class="text-2xl font-bold font-mono text-gray-800 dark:text-gray-100 truncate">{{ display }}</div>
    </div>

    <!-- Buttons Grid -->
    <div class="grid grid-cols-4 gap-2 flex-1">
      <template v-for="(row, rIdx) in buttons" :key="rIdx">
        <template v-for="(btn, bIdx) in row" :key="bIdx">
          <UButton
            v-if="btn !== ''"
            :label="btn"
            size="md"
            class="flex items-center justify-center font-bold text-sm h-11 w-full"
            :color="btn === '=' ? 'primary' : btn === 'C' ? 'red' : ['/', '*', '-', '+'].includes(btn) ? 'orange' : 'gray'"
            variant="solid"
            @click="handleClick(btn)"
          />
          <div v-else class="h-11 w-full" />
        </template>
      </template>
    </div>
  </DesktopWindow>
</template>
