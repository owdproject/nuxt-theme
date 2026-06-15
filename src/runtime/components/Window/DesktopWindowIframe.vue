<script setup lang="ts">
defineProps({
  config: { type: null, required: false },
  window: { type: null, required: false },
  src: { type: String, required: true }
});
</script>

<template>
  <DesktopWindow v-bind="$props">
    <iframe :src="src" class="w-full h-full border-0" />
  </DesktopWindow>
</template>
