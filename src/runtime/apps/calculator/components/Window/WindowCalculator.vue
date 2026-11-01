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
  <DesktopWindow :window="window" :content="{ padded: true }">
    <div class="flex h-full min-h-0 flex-col gap-3">
      <!-- Calculator screen -->
      <div
        class="flex-shrink-0 rounded-lg border border-gray-200 bg-white p-3 text-right shadow-inner dark:border-gray-800 dark:bg-gray-900"
      >
        <div class="mb-0.5 h-4 truncate text-xs text-gray-400 dark:text-gray-500">
          {{ equation }}
        </div>
        <div
          class="truncate font-mono text-2xl font-bold text-gray-800 dark:text-gray-100"
        >
          {{ display }}
        </div>
      </div>

      <!-- Buttons grid -->
      <div class="grid grid-cols-4 grid-rows-5 gap-2 flex-1 min-h-0">
        <template v-for="(row, rIdx) in buttons" :key="rIdx">
          <template v-for="(btn, bIdx) in row" :key="bIdx">
            <UButton
              v-if="btn !== ''"
              :label="btn"
              class="flex h-full w-full items-center justify-center text-sm font-semibold"
              :color="btn === '=' ? 'primary' : btn === 'C' ? 'red' : ['/', '*', '-', '+'].includes(btn) ? 'orange' : 'gray'"
              variant="solid"
              @click="handleClick(btn)"
            />
            <div v-else />
          </template>
        </template>
      </div>
    </div>
  </DesktopWindow>
</template>
