export const nitroConfig = {
  ssr: process.env.SSR === 'true',
  nitro: {
    externals: {
      inline: [
        'vue',
        'vue-router',
        '@unhead/vue',
        '@primevue/core/base/style',
        '@primevue/core/basecomponent/style',
      ],
    },
    prerender: process.env.CI
      ? {
          routes: [],
          crawlLinks: false,
        }
      : {
          routes: (() => {
            const locales =
              process.env.PRERENDER_LOCALES?.split(',').map((l: string) =>
                l.trim()
              ) || []
            const pages =
              process.env.PRERENDER_ROUTES?.split(',').map((r: string) =>
                r.trim()
              ) || []
            return locales.flatMap((locale: string) =>
              pages.map((page: string) => `/${locale}${page}`)
            )
          })(),
          crawlLinks: process.env.PRERENDER_CRAWL_LINKS === 'true',
          ignore: process.env.PRERENDER_IGNORE
            ? process.env.PRERENDER_IGNORE.split(',').map((r: string) =>
                r.trim()
              )
            : [],
        },
    output: {
      publicDir: './.output/public',
    },
  },
}
