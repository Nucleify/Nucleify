export function getRouteRules(locales: readonly { code: string }[]) {
  const isLocal = process.env.APP_ENV === 'local'

  return {
    '/': { prerender: false },
    ...(isLocal
      ? {}
      : {
          '/**/_payload.js': {},
          '/**/_payload.json': {},
          ...Object.fromEntries(
            locales.map((locale) => [
              `/${locale.code}/*`,
              { swr: true, prerender: true },
            ]),
          ),
        }),
  }
}
