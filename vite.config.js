import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import stylelint from "vite-plugin-stylelint";
import viteCompression from 'vite-plugin-compression';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    server: {
        host: '0.0.0.0',
        hmr: {
            host: 'localhost'
        }
    },
    plugins: [
        laravel({
            input: [
                'atomic/bosons/styles/index.scss',
                'atomic/app.ts',
            ],
            refresh: true,
        }),
        stylelint(),
        viteCompression(),
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
            'atomic': '/atomic',
            'modules': '/modules',
            'sass': '/atomic/bosons/styles'
        },
    },
    build: {
        chunkSizeWarningLimit: 1600,
        sourcemap: true,
        rollupOptions: {
            output: {
                sourcemapExcludeSources: true,
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return id.toString().split('node_modules/')[1].split('/')[0].toString();
                    }

                    if (id.includes('/modules/')) {
                        return id.toString().split('/modules/')[1].split('/')[0];
                    }
                }
            }
        },
        assetsDir: '',
    },
    define: {
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
    }
});