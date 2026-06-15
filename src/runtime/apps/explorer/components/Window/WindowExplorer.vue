<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { inject } from 'vue'
import { DESKTOP_DIALOG_PROVIDER_KEY } from '@owdproject/core/runtime/constants/desktopShellKeys'
import { createExplorerWindowMenuItems } from '@owdproject/module-fs/runtime/composables/useExplorerWindowMenu'

const props = defineProps<{
  window: any
}>()

const { t } = useI18n()
const dialogs = inject<any>(DESKTOP_DIALOG_PROVIDER_KEY)

const explorerMenu = createExplorerWindowMenuItems(
  () => props.window,
  t,
  () => {
    dialogs?.alert('Nuxt UI theme explorer powered by module-fs!', { title: 'About Explorer' })
  }
)

props.window.setMenu(explorerMenu)
</script>

<template>
  <DesktopExplorerWorkspace
    :window="window"
    frame-class="nuxt-explorer-frame"
  >
    <template #nav>
      <DesktopWindowNav />
    </template>
  </DesktopExplorerWorkspace>
</template>
