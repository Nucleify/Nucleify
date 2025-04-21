import { Ref } from 'vue'

import { HexagonConfigInterface } from '../types'
import { calculateDimensions, updateHexagonPatterns } from '.'

export const updateImagesPerRow = (
  containerRef: Ref<HTMLElement | null>,
  imagesPerRow: Ref<number>,
  totalRows: Ref<number>,
  hexagonRows: Ref<number[][][]>
) => {
  if (!containerRef.value) return

  const {
    imagesPerRow: calculatedImages,
    totalRows: calculatedRows,
  }: HexagonConfigInterface = calculateDimensions(
    containerRef.value.clientWidth,
    containerRef.value.clientHeight
  )

  imagesPerRow.value = calculatedImages
  totalRows.value = calculatedRows
  hexagonRows.value = updateHexagonPatterns(totalRows.value, imagesPerRow.value)
}
