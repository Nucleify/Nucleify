import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: {
            'atomic': '/atomic'
        },
    },
    test: {
        environment: 'jsdom',
        include: [
            'vitests/**/*.{test,spec}.{js,ts,jsx,tsx}',
            'modules/**/*.{test,spec}.{js,ts,jsx,tsx}', 
        ],
    },
});
