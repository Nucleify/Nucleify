import {
  defaultSectionWidgets,
  SOLID_SYNC_SECTION_TYPES,
} from './default_section_widgets'

/** Emit registry row for Next / Solid / Svelte public shells. */
export type CmsSectionEmitEntry = {
  type: string
  /** Path from shell `cms/` → section module (no extension). */
  importPath: string
  bind: string
}

export type CmsSectionLazyEntry = { type: string; importPath: string }

/** `sections/thank_you` → `ThankYouSection` */
export function sectionBindName(webComponentKey: string): string {
  const slug = webComponentKey.replace(/^sections\//, '')
  const pascal = slug
    .split(/[_/]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
  return `${pascal}Section`
}

function emitEntry(type: string, webComponentKey: string): CmsSectionEmitEntry {
  return {
    type,
    importPath: `../${webComponentKey}/index`,
    bind: sectionBindName(webComponentKey),
  }
}

/** Derived from {@link defaultSectionWidgets} — do not hand-maintain a parallel list. */
export const CMS_SECTION_EMIT: CmsSectionEmitEntry[] =
  defaultSectionWidgets.map((w) => emitEntry(w.type, w.webComponentKey))

export const CMS_SECTION_EMIT_SOLID_SYNC: CmsSectionEmitEntry[] =
  CMS_SECTION_EMIT.filter((e) => SOLID_SYNC_SECTION_TYPES.has(e.type))

export const CMS_SECTION_EMIT_SOLID_LAZY: CmsSectionLazyEntry[] =
  CMS_SECTION_EMIT.filter((e) => !SOLID_SYNC_SECTION_TYPES.has(e.type)).map(
    ({ type, importPath }) => ({ type, importPath })
  )
