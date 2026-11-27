import type { NucHomeModuleLaneId } from '../cms/defaults/content/home'

export const HOLO_CUBE_LANES: readonly NucHomeModuleLaneId[] = [
  'ui',
  'sdk',
  'data',
] as const

export type HoloCubeFace = { id: NucHomeModuleLaneId; label: string }

/** Build cube face labels from a lane → string map (CMS / copy bags). */
export function holoCubeFaces(
  labels: Partial<Record<NucHomeModuleLaneId, string>>
): HoloCubeFace[] {
  return HOLO_CUBE_LANES.map((id) => ({
    id,
    label: labels[id] ?? id,
  }))
}
