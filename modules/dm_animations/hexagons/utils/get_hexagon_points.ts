export function getHexagonPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = (Math.PI / 3) * i - Math.PI / 6
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)].join(',')
  }).join(' ')
}
