export function getRouteRules(locales: readonly { code: string }[]) {
  const isLocal = process.env.APP_ENV === 'local'

  const documentationRules = {
    '/*/docs': { ssr: true, prerender: true },
    '/*/docs/**': { ssr: true, prerender: true },
    '/api/documentation/markdown/**': { prerender: true },
  }

  return {
    '/': { prerender: false },
    ...documentationRules,
    ...(isLocal
      ? {}
      : {
          '/**/_payload.js': {},
          '/**/_payload.json': {},
          ...Object.fromEntries(
            locales.map((locale) => [
              `/${locale.code}/*`,
              { swr: true, prerender: true },
            ])
          ),
        }),
  }
}
