import { scanOverrides } from '.'

// biome-ignore lint/suspicious/noExplicitAny: Nitro config type
export function handleNitroConfig(config: any): void {
  const excluded = scanOverrides().map((m) =>
    m.originalPath.replace(process.cwd() + '/', '')
  )
  if (excluded.length) {
    config.ignore = [...new Set([...(config.ignore || []), ...excluded])]
  }
}
