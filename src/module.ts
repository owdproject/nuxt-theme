import { existsSync } from 'node:fs'
import {
  createResolver,
  addComponentsDir,
  installModule,
  addImportsDir,
  addPlugin,
} from '@nuxt/kit'
import { defineDesktopTheme } from '@owdproject/nuxt'
import {
  registerTailwindPath,
  registerThemeTailwindPath,
} from '@owdproject/nuxt-kit-ui/kit/registerTailwindPath'
import { installNuxtBuiltInApps } from './runtime/apps/installBuiltInApps'

export default defineDesktopTheme({
  meta: {
    name: 'desktop-theme-nuxt',
  },
  defaults: {
    name: 'nuxt',
    systemBar: {
      enabled: true,
      position: 'top',
      startButton: true,
    },
    windows: {
      position: 'fixed',
    },
  },
  async setup(_options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // Install the Nuxt UI kit module
    await installModule('@owdproject/nuxt-kit-ui')

    // Register Tailwind content scan paths for theme-nuxt components and pages
    registerThemeTailwindPath(nuxt, import.meta.url)
    registerTailwindPath(nuxt, resolve('./runtime/pages/**/*.{vue,mjs,ts}'))

    // Add theme components
    addComponentsDir({
      path: resolve('./runtime/components'),
      pathPrefix: false,
    })

    // Register i18n module localization if present
    nuxt.hook('i18n:registerModule', (register) => {
      register({
        langDir: resolve('./i18n'),
        locales: [
          {
            code: 'en',
            file: existsSync(resolve('./i18n/locales/en.js')) ? 'locales/en.js' : 'locales/en.ts',
          },
        ],
      })
    })

    // Register theme dirs
    addImportsDir(resolve('./runtime/composables'))
    addImportsDir(resolve('./runtime/consts'))
    addImportsDir(resolve('./runtime/stores'))
    addImportsDir(resolve('./runtime/utils'))

    // Install built-in apps (Explorer, Calculator, Notepad)
    installNuxtBuiltInApps(nuxt, import.meta.url)
  },
})
