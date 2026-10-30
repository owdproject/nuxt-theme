import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [{ input: 'src/i18n/', outDir: 'dist/i18n/', builder: 'mkdist', ext: 'js' }],
  externals: [
    '@owdproject/core',
    /^@owdproject\/core\//,
    '@owdproject/nuxt-kit-ui',
    '@owdproject/nuxt-module-fs',
    'vue',
    'nuxt',
  ],
})
