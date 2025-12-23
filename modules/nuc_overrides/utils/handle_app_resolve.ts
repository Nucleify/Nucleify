import { scanOverrides } from '.'

import { normalize, resolve } from 'path'

// biome-ignore lint/suspicious/noExplicitAny: Nuxt app type
export function handleAppResolve(app: any): void {
  const appVuePath = normalize(resolve(process.cwd(), 'nuxt', 'app.vue'))
  const override = scanOverrides().find(
    (m) => normalize(m.originalPath) === appVuePath
  )
  if (override && app.rootComponent) {
    app.rootComponent = override.overridePath
  }
}
