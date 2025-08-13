import vue from '@vitejs/plugin-vue'
import { mergeConfig } from 'vite'

const config = {
  stories: ['./*.mdx', '../nuxt/atomic/**/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: false,
  },
  viteFinal: async (config) => {
    return mergeConfig(config, {
      plugins: [vue()],
    })
  },
}
export default config
