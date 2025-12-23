import { getExcludedPaths } from '.'

// biome-ignore lint/suspicious/noExplicitAny: Nitro config type
export function handleNitroConfig(config: any): void {
  const excludedPaths = getExcludedPaths()
  if (excludedPaths.length > 0) {
    if (!config.ignore) {
      config.ignore = []
    }
    excludedPaths.forEach((path) => {
      const relativePath = path.replace(process.cwd() + '/', '')
      if (!config.ignore?.includes(relativePath)) {
        config.ignore.push(relativePath)
      }
    })
  }
}
