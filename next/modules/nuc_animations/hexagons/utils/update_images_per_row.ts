import { calculateDimensions, updateHexagonPatterns } from '.'
import type { HexagonConfigInterface, HexagonPatternsType } from '../types'

export const updateImagesPerRow = (
  containerRef: HTMLElement | null,
  setImagesPerRow: (value: number) => void,
  setTotalRows: (value: number) => void,
  setHexagonRows: (value: HexagonPatternsType) => void
): void => {
  if (!containerRef) return

  const {
    imagesPerRow: calculatedImages,
    totalRows: calculatedRows,
  }: HexagonConfigInterface = calculateDimensions(
    containerRef.clientWidth,
    containerRef.clientHeight
  )

  setImagesPerRow(calculatedImages)
  setTotalRows(calculatedRows)
  setHexagonRows(updateHexagonPatterns(calculatedRows, calculatedImages))
}
