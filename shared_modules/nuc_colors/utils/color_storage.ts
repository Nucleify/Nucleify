import {
  colorKeys,
  colorShades,
  cookieGetItem,
  cookieSetItem,
  isNextRuntime,
  localStorageGetItem,
  localStorageSetItem,
  mainDefaultColorsNext,
  mainDefaultColorsNuxt,
} from 'nucleify'

export type ColorFramework = 'nuxt' | 'next'

const STORAGE_SEPARATOR = ':'

export function getColorFramework(): ColorFramework {
  return isNextRuntime() ? 'next' : 'nuxt'
}

export function getColorScopeClass(): 'nuc-nuxt' | 'nuc-next' {
  return getColorFramework() === 'next' ? 'nuc-next' : 'nuc-nuxt'
}

/** CSS selector for injecting runtime color variables. */
export function getColorScopeSelector(): string {
  return getColorFramework() === 'next'
    ? '.nuc-next, #back-office'
    : '.nuc-nuxt, #back-office'
}

export function getColorStorageKey(logicalKey: string): string {
  return `${getColorFramework()}${STORAGE_SEPARATOR}${logicalKey}`
}

export function getColorStorageKeyForFramework(
  logicalKey: string,
  framework: ColorFramework
): string {
  return `${framework}${STORAGE_SEPARATOR}${logicalKey}`
}

export function getColorStorageCookiePattern(logicalKey: string): RegExp {
  return getColorStorageCookiePatternForFramework(
    logicalKey,
    getColorFramework()
  )
}

export function getColorStorageCookiePatternForFramework(
  logicalKey: string,
  framework: ColorFramework
): RegExp {
  const escaped = getColorStorageKeyForFramework(logicalKey, framework).replace(
    /[.*+?^${}()|[\]\\]/g,
    '\\$&'
  )
  return new RegExp(`${escaped}=([^;]+)`)
}

function readRawStorageKey(storageKey: string): string | null {
  return localStorageGetItem(storageKey) || cookieGetItem(storageKey) || null
}

function writeRawStorageKey(storageKey: string, value: string): void {
  localStorageSetItem(storageKey, value)
  cookieSetItem(storageKey, value)
}

function isMainPaletteKey(logicalKey: string): boolean {
  return logicalKey.startsWith('main-')
}

function shouldAssignLegacyMainToFramework(
  logicalKey: string,
  legacyValue: string,
  framework: ColorFramework
): boolean {
  const baseKey = logicalKey.replace(/-(?:s|u)$/, '')
  const nuxtDefault = mainDefaultColorsNuxt[baseKey]
  const nextDefault = mainDefaultColorsNext[baseKey]

  if (!nuxtDefault || !nextDefault) return true

  const normalized = legacyValue.toLowerCase()

  if (normalized === nextDefault.toLowerCase()) {
    return framework === 'next'
  }

  if (normalized === nuxtDefault.toLowerCase()) {
    return framework === 'nuxt'
  }

  return true
}

function migrateLegacyValue(logicalKey: string, legacyValue: string): void {
  const framework = getColorFramework()

  if (
    isMainPaletteKey(logicalKey) &&
    !shouldAssignLegacyMainToFramework(logicalKey, legacyValue, framework)
  ) {
    return
  }

  writeRawStorageKey(getColorStorageKey(logicalKey), legacyValue)
}

export function colorStorageGet(logicalKey: string): string | null {
  const prefixed = getColorStorageKey(logicalKey)
  const prefixedValue = readRawStorageKey(prefixed)
  if (prefixedValue) return prefixedValue

  const legacyValue = readRawStorageKey(logicalKey)
  if (legacyValue) {
    migrateLegacyValue(logicalKey, legacyValue)
    return legacyValue
  }

  return null
}

export function colorStorageSet(logicalKey: string, value: string): void {
  writeRawStorageKey(getColorStorageKey(logicalKey), value)
}

export function colorStorageGetInitializedKey(): string {
  return `${getColorFramework()}${STORAGE_SEPARATOR}colors-initialized`
}

export function ensureFrameworkColorStorage(): void {
  const framework = getColorFramework()
  const migrationKey = `${framework}${STORAGE_SEPARATOR}colors-storage-v1`

  if (localStorageGetItem(migrationKey) === 'true') return

  const logicalKeys: string[] = []
  colorKeys.forEach((item: string) =>
    colorShades.forEach((state: string) => {
      logicalKeys.push(`${item}-${state}-s`, `${item}-${state}-u`)
    })
  )

  for (const logicalKey of logicalKeys) {
    if (readRawStorageKey(getColorStorageKey(logicalKey))) continue

    const legacyValue = readRawStorageKey(logicalKey)
    if (!legacyValue) continue

    migrateLegacyValue(logicalKey, legacyValue)
  }

  const legacyInitialized = localStorageGetItem('colors-initialized')
  if (
    legacyInitialized === 'true' &&
    !localStorageGetItem(colorStorageGetInitializedKey())
  ) {
    localStorageSetItem(colorStorageGetInitializedKey(), 'true')
  }

  localStorageSetItem(migrationKey, 'true')
}
