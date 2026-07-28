import { resolve } from 'node:path'

export const structureConfig = {
  alias: {
    nucleify: '~/nucleify',
    nuc_client: '~/nuc_client',
    nuc_server: '~/server/nuc_server',
  },
  components: [],
  imports: {
    dirs: ['~/composables/**'],
    exclude: [
      'modules/**/*.tsx',
      'modules/**/*.react.ts',
      'modules/**/index.react.ts',
      'modules/index.react.ts',
      'modules/**/vitests/**',
      'modules/**/*.test.ts',
      'modules/**/*.spec.ts',
      'next/**',
      'app/**',
    ],
  },
  srcDir: 'nuxt',
  serverDir: 'nuxt/server',
  dir: {
    modules: 'nuxt/modules',
    public: 'public',
  },
  publicDir: 'public',
  plugins: [
    resolve(process.cwd(), 'modules/nuc_languages/plugins/nuc_translations.ts'),
  ],
}
