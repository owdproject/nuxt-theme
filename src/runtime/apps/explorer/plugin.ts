import { defineNuxtPlugin } from 'nuxt/app'
import { defineDesktopApp } from '@owdproject/nuxt/kit/defineDesktopApp'
import configAppExplorer from './app.config'

export default defineNuxtPlugin({
  name: 'desktop-theme-nuxt-explorer',
  dependsOn: ['pinia', 'desktop-shell-init'],
  async setup() {
    if (import.meta.server) return
    await defineDesktopApp(configAppExplorer)
  },
})
