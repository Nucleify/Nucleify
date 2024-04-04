export default function darkenColor(
    color: string,
    percent: number,
    alpha: number = 1
): string {
    const rgb = parseInt(color.slice(1), 16)
    const r = (rgb >> 16) & 0xff
    const g = (rgb >> 8) & 0xff
    const b = (rgb >> 0) & 0xff

    const darkenFactor = 1 - percent / 100
    const newR = Math.floor(r * darkenFactor)
    const newG = Math.floor(g * darkenFactor)
    const newB = Math.floor(b * darkenFactor)

    return `rgba(${newR}, ${newG}, ${newB}, ${alpha})`
}
