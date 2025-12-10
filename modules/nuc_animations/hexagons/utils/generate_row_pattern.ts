import type { HexagonRowType } from '../types'

export function generateRowPattern(
  rowIndex: number,
  totalImages: number,
  totalRows: number
): HexagonRowType {
  const onesCount = Math.ceil((totalImages * (rowIndex + 1)) / (totalRows * 2))
  const pattern = new Array(totalImages).fill(0)

  let placedOnes = 0
  while (placedOnes < onesCount) {
    const randomIndex = Math.floor(Math.random() * totalImages)
    if (pattern[randomIndex] === 0) {
      pattern[randomIndex] = 1
      placedOnes++
    }
  }

  const half = Math.floor(totalImages / 2)
  return [pattern.slice(0, half), pattern.slice(half)]
}
