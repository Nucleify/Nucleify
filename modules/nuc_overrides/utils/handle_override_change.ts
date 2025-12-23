import { normalize } from 'path'
import type { ViteDevServer } from 'vite'

export function handleOverrideChange(
  server: ViteDevServer,
  overridesDir: string,
  overrideMap: Map<string, string>,
  refresh: () => void
) {
  return (file: string) => {
    if (!file.startsWith(overridesDir)) return

    refresh()
    invalidateOriginalModule(server, overrideMap, file)
    server.ws.send({ type: 'full-reload' })
  }
}

function invalidateOriginalModule(
  server: ViteDevServer,
  overrideMap: Map<string, string>,
  changedFile: string
) {
  const normalizedFile = normalize(changedFile)
  const originalPath = findOriginalPath(overrideMap, normalizedFile)

  if (originalPath) {
    const module = server.moduleGraph.getModuleById(originalPath)
    if (module) server.moduleGraph.invalidateModule(module)
  }
}

function findOriginalPath(
  overrideMap: Map<string, string>,
  overridePath: string
): string | undefined {
  return [...overrideMap].find(([, override]) => override === overridePath)?.[0]
}
