import vue from '@vitejs/plugin-vue'
import path from 'path'
import { mergeConfig } from 'vite'

const config = {
  stories: ['./*.mdx', '../nuxt/atomic/**/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      docgen: false,
    },
  },
  docs: {
    autodocs: false,
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [vue()],
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: (content, filepath) => {
              const rootDir = path.resolve(__dirname, '..')
              return `@import "${rootDir}/nuxt/assets/_index.scss";\n${content}`
            },
          },
        },
      },
    })
  },
}
export default config
