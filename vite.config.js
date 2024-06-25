import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

import VueTypeImports from 'vite-plugin-vue-type-imports'

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
        VueTypeImports()
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm-bundler.js',
            '@': '/atomic/_old_structure/ts',
            'atomic': '/atomic'
        },
    },
    build: {
        chunkSizeWarningLimit: 1600
    }
});
