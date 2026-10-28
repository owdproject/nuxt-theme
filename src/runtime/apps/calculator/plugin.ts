import { defineNuxtPlugin } from 'nuxt/app'
import { defineDesktopApp } from 'nuxt-desktop/kit/defineDesktopApp'
import configAppCalculator from './app.config'

export default defineNuxtPlugin({
  name: 'desktop-theme-nuxt-calculator',
  dependsOn: ['pinia', 'desktop-shell-init'],
  async setup() {
    if (import.meta.server) return
    await defineDesktopApp(configAppCalculator)
  },
})
