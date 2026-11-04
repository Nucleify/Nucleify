export type DonutArc = {
  id: string
  label: string
  d: string
  color: string
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180
  return {
    x: Number((cx + r * Math.cos(rad)).toFixed(3)),
    y: Number((cy + r * Math.sin(rad)).toFixed(3)),
  }
}

function annularSector(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  start: number,
  end: number
): string {
  const sweep = end - start
  const large = sweep > 180 ? 1 : 0
  const outerStart = polar(cx, cy, rOuter, start)
  const outerEnd = polar(cx, cy, rOuter, end)
  const innerEnd = polar(cx, cy, rInner, end)
  const innerStart = polar(cx, cy, rInner, start)
  return [
    `M${outerStart.x} ${outerStart.y}`,
    `A${rOuter} ${rOuter} 0 ${large} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L${innerEnd.x} ${innerEnd.y}`,
    `A${rInner} ${rInner} 0 ${large} 0 ${innerStart.x} ${innerStart.y}`,
    'Z',
  ].join(' ')
}

type ArcInput = { id: string; label: string; color: string; sweep: number }

function arcsFromSweeps(
  items: readonly ArcInput[],
  layout: {
    cx: number
    cy: number
    radius: number
    innerRadius: number
    gapDeg: number
  }
): DonutArc[] {
  const { cx, cy, radius, innerRadius, gapDeg } = layout
  let cursor = -90
  return items.map((item) => {
    const pad = Math.min(gapDeg / 2, item.sweep / 6)
    const start = cursor + pad
    const end = cursor + item.sweep - pad
    cursor += item.sweep
    return {
      id: item.id,
      label: item.label,
      d: annularSector(cx, cy, innerRadius, radius, start, end),
      color: item.color,
    }
  })
}

/** Equal framework slices for the thesis donut. */
export function equalDonutArcs(
  shells: readonly { id: string; label: string; color: string }[],
  layout = { cx: 50, cy: 50, radius: 46, innerRadius: 28, gapDeg: 3 }
): DonutArc[] {
  const sweep = 360 / Math.max(shells.length, 1)
  return arcsFromSweeps(
    shells.map((shell) => ({ ...shell, sweep })),
    layout
  )
}

export type WebShareSlice = { id: string; label: string; pct: number }

export type WebShareGroup = {
  id: string
  label: string
  color: string
  sliceIds: readonly string[]
}

/** Default donut geometry when CMS omits chart layout numbers. */
export const WEB_SHARE_CHART_LAYOUT = {
  cx: 50,
  cy: 50,
  radius: 46,
  innerRadius: 30,
  gapDeg: 1.6,
} as const

/** Build SVG donut arcs from CMS share slices + groups. */
export function webShareArcsFrom(config: {
  cx: number
  cy: number
  radius: number
  innerRadius: number
  gapDeg: number
  slices: readonly WebShareSlice[]
  groups: readonly WebShareGroup[]
}): DonutArc[] {
  const byId = Object.fromEntries(config.slices.map((s) => [s.id, s]))
  const packed = config.groups.map((group) => ({
    group,
    weight: group.sliceIds.reduce((sum, id) => sum + (byId[id]?.pct ?? 0), 0),
  }))
  const total = packed.reduce((sum, item) => sum + item.weight, 0) || 1
  return arcsFromSweeps(
    packed.map(({ group, weight }) => ({
      id: group.id,
      label: group.label,
      color: group.color,
      sweep: (weight / total) * 360,
    })),
    config
  )
}

export function webShareLine(groups: readonly WebShareGroup[]): string {
  return groups.map((group) => group.label).join(' · ')
}
