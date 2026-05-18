export const structureConfig = {
  alias: {
    nucleify: '~/atomic',
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
    dirs: ['~/composables/**', '~/atomic/**', 'modules/**'],
  },
  srcDir: 'nuxt',
  publicDir: '../../public',
}
