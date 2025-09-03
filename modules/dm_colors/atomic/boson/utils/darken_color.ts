export function darkenColor(
  color: string,
  percent: number,
  alpha: number = 1
): string {
  const rgb: number = parseInt(color.slice(1), 16)
  const r: number = (rgb >> 16) & 0xff
  const g: number = (rgb >> 8) & 0xff
  const b: number = (rgb >> 0) & 0xff

  const darkenFactor: number = 1 - percent / 100
  const newR: number = Math.floor(r * darkenFactor)
  const newG: number = Math.floor(g * darkenFactor)
  const newB: number = Math.floor(b * darkenFactor)

  return `rgba(${newR}, ${newG}, ${newB}, ${alpha})`
}
