export const viteConfig = {
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag: string) => tag.startsWith('nui-'),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        // Shared parts/sections expect marketing breakpoints.
          additionalData:
            '$sm: 640px; $md: 768px; $lg: 1024px; $xl: 1280px; $doc-layout-min: 1400px;',
        silenceDeprecations: [
          'mixed-decls',
          'import',
          'color-functions',
          'global-builtin',
        ],
      },
    },
  },
}
