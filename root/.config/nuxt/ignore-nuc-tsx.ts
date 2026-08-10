/**
 * Vite plugin: never bundle authoring `*.nuc.tsx` (compiler input only).
 */
export function ignoreNucTsxPlugin() {
  return {
    name: 'nucleify-ignore-nuc-tsx',
    enforce: 'pre' as const,
    load(id: string) {
      if (/\.nuc\.tsx($|\?)/.test(id)) {
        return 'export default {}'
      }
    },
  }
}
