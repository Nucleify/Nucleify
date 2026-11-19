import { resolve } from 'node:path'

const root = resolve(process.cwd(), '..')
const adminSrc = resolve(process.cwd(), 'src')

export const structureConfig = {
  srcDir: 'src',
  serverDir: 'src/server',
  // Bundle nui tokens with the render-blocking sheet (not only the client plugin chunk).
  css: [
    'nucleify-ui/styles/variables.css',
    'nucleify-ui/styles/global.css',
    resolve(root, 'portable/nui/tokens.css'),
    // primitives.scss is @use'd from admin.scss (Nuxt css[] missed ~/components/…).
    '~/assets/admin.scss',
  ],
  vue: {
    compilerOptions: {
      isCustomElement: (tag: string) => tag.startsWith('nui-'),
    },
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
    {
      path: '~/components/fields',
      prefix: 'Field',
      pathPrefix: false,
    },
    {
      path: '~/components/media',
      prefix: 'Media',
      pathPrefix: false,
    },
    {
      path: '~/components/shell',
      prefix: 'Admin',
      pathPrefix: false,
    },
    {
      path: '~/components/ui',
      prefix: 'Admin',
      pathPrefix: false,
    },
  ],
  alias: {
    '@web': resolve(root, 'web/src'),
    '@admin': adminSrc,
    '@shared_modules': resolve(root, 'shared_modules'),
    '@portable': resolve(root, 'portable'),
    'portable/nui': resolve(root, 'portable/nui'),
    modules: resolve(root, 'shared_modules'),
    'modules/*': resolve(root, 'shared_modules/*'),
    nuc_api: resolve(root, 'shared_modules/nuc_api/supabase/api/server.ts'),
    nuc_server: resolve(adminSrc, 'server/nuc_server.ts'),
    nucleify: resolve(root, 'shared_modules/index.ts'),
  },
}
