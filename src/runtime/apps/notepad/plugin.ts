import { defineNuxtPlugin } from 'nuxt/app'
import { defineDesktopApp } from 'nuxt-desktop/kit/defineDesktopApp'
import configAppNotepad from './app.config'

export default defineNuxtPlugin({
  name: 'desktop-theme-nuxt-notepad',
  dependsOn: ['pinia', 'desktop-shell-init'],
  async setup() {
    if (import.meta.server) return
    await defineDesktopApp(configAppNotepad)
  },
})
