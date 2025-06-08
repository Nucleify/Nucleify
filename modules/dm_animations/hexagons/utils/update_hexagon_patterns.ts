import type { HexagonPatternsType } from '../types'
import { generateRowPattern } from '.'

export function updateHexagonPatterns(
  totalRows: number,
  imagesPerRow: number
): HexagonPatternsType {
  const patterns: HexagonPatternsType = []
  for (let i = 0; i < totalRows; i++) {
    patterns[i] = generateRowPattern(i, imagesPerRow, totalRows)
  }
  return patterns
}
