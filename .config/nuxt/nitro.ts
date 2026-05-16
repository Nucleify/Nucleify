export const nitroConfig = {
  ssr: process.env.SSR === 'true',
  nitro: {
    preset: process.env.NITRO_PRESET || 'cloudflare',
    externals: {
      inline: [
        'vue',
        'vue-router',
        '@unhead/vue',
        '@primevue/core/base/style',
        '@primevue/core/basecomponent/style',
      ],
    },
    prerender: false,
  },
}
