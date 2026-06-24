/**
 * Nuxt-only `.vue` barrels may appear in the module graph via shared `index.ts`
 * files. Next `typeslint` treats them as opaque modules — no Vue SFC checking.
 */
declare module '*.vue' {
  const component: unknown
  export default component
}
