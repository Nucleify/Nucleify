import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
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
            '@': '/atomic/_old_structure/ts',
            'atomic': '/atomic',
            'sass': '/atomic/bosons/styles'
        },
    },
    build: {
        chunkSizeWarningLimit: 1600,
        sourcemap: true,
        rollupOptions: {
            output: {
                sourcemapExcludeSources: true
            },
        },
    },
    define: {
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
    }
});
