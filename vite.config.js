import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import stylelint from 'vite-plugin-stylelint'
import viteCompression from 'vite-plugin-compression'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    hmr: {
      host: 'localhost',
    },
  },
  plugins: [
    laravel({
      input: ['atomic/app.ts'],
      refresh: true,
    }),
    stylelint(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240,
      deleteOriginFile: false,
    }),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      atomic: '/atomic',
      modules: '/modules',
      sass: '/atomic/bosons/styles',
    },
  },
  build: {
    chunkSizeWarningLimit: 1600,
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        sourcemapExcludeSources: true,
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const name = id
              .toString()
              .split('node_modules/')[1]
              .split('/')[0]
              .toString()
            return `vendor-${name}`
          }
          if (id.includes('/modules/')) {
            const path = id.split('/modules/')[1].split('/')[0]
            return `module-${path}`
          }
          if (id.includes('/atomic/')) {
            const path = id.split('/atomic/')[1].split('/')[0]
            return `atomic-${path}`
          }
        },
      },
    },
    assetsDir: '',
  },
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
})
