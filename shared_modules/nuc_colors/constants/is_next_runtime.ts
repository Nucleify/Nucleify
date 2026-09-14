function hasFrameworkClass(className: 'nuc-next' | 'nuc-nuxt'): boolean {
  if (typeof document === 'undefined') return false

  const roots = [document.documentElement, document.body]
  return roots.some((el) => el?.classList.contains(className))
}

export function isNextRuntime(): boolean {
  if (hasFrameworkClass('nuc-next')) return true
  if (hasFrameworkClass('nuc-nuxt')) return false

  if (typeof window !== 'undefined' && '__NEXT_DATA__' in window) return true

  return false
}
