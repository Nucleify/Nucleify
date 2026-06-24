import { resolve } from 'node:path'

export const structureConfig = {
  alias: {
    nucleify: '~/nucleify',
    'nucleify/atom': '~/atomic/atom',
    'nucleify/molecule': '~/atomic/molecule',
    'nucleify/organism': '~/atomic/organism',
    nuc_client: '~/nuc_client',
    nuc_server: '~/server/nuc_server',
  },
  components: [
    { path: '~/atomic/atom', prefix: 'ad', extensions: ['vue'] },
    { path: '~/atomic/molecule', prefix: 'ad', extensions: ['vue'] },
    { path: '~/atomic/organism', prefix: 'ad', extensions: ['vue'] },
  ],
  imports: {
    dirs: ['~/composables/**', '~/atomic/**'],
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
  publicDir: '../../public',
  plugins: [
    resolve(process.cwd(), 'modules/nuc_languages/plugins/nuc_translations.ts'),
  ],
}
