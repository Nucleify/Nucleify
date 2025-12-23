import { scanOverrides } from '.'

export function handleImportsDirs(dirs: string[]): string[] {
  const mappings = scanOverrides()
  return dirs.map((dir: string) => {
    for (const mapping of mappings) {
      if (mapping.originalPath.startsWith(dir)) {
        return dir
      }
    }
    return dir
  })
}
