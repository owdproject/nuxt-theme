import type { Nuxt } from '@nuxt/schema'

export type NuxtThemeBuiltInApp = {
  name: string
  autoload: boolean
  when?: (nuxt: Nuxt) => boolean
}

export function hasModuleFs(nuxt: Nuxt): boolean {
  const desktop = nuxt.options.runtimeConfig.public.desktop as {
    modules?: string[]
  }
  const modules = desktop?.modules ?? []
  return modules.some((m) => String(m).includes('module-fs'))
}

export const NUXT_THEME_BUILTIN_APPS: NuxtThemeBuiltInApp[] = [
  { name: 'explorer', autoload: true },
  { name: 'calculator', autoload: true },
  { name: 'notepad', autoload: true },
]
