import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  externals: [
    '@owdproject/core',
    /^@owdproject\/core\//,
    '@owdproject/kit-nuxt-ui',
    '@owdproject/module-fs',
    'vue',
    'nuxt',
  ],
})
