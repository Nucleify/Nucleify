export const viteConfig = {
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag: string) => tag.startsWith('nui-'),
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
    minify: 'terser',
    cssCodeSplit: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      maxParallelFileOps: 2,
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', '@unhead/vue', 'vue-i18n'],
          pinia: ['pinia', 'pinia-plugin-persistedstate'],
          'nucleify-ui': ['lit'],
          chartjs: ['chart.js'],
          marked: ['marked'],
          highlightjs: ['highlight.js'],
          iconify: ['@iconify/vue', '@iconify/utils', '@iconify/types'],
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "~/assets/index";`,
        silenceDeprecations: [
          'mixed-decls',
          'import',
          'color-functions',
          'global-builtin',
        ],
      },
    },
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', 'lit', 'animejs'],
  },
}
