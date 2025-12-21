import { scanOverrides } from '.'

export function getExcludedPaths(): string[] {
  const mappings = scanOverrides()
  return mappings.map((m) => m.originalPath)
}
