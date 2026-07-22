function isPrerenderEnabled(): boolean {
  if (process.env.CI === 'true') return false
  if (process.env.PRERENDER === 'false') return false
  return true
}

export function getRouteRules(locales: readonly { code: string }[]) {
  const isLocal = process.env.APP_ENV === 'local'
  const prerender = isPrerenderEnabled()

  const documentationRules = {
    '/*/docs': { ssr: true, prerender },
    '/*/docs/**': { ssr: true, prerender },
    '/api/documentation/markdown/**': { prerender },
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
              { swr: true, prerender },
            ])
          ),
        }),
  }
}
