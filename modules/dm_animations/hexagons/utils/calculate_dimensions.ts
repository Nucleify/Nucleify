import type { HexagonConfigInterface } from '../types'
import {
  HEXAGON_HEIGHT,
  HEXAGON_OVERLAP_FACTOR,
  HEXAGON_WIDTH,
  HEXAGON_WIDTH_FACTOR,
} from '../variables'

export function calculateDimensions(
  containerWidth: number,
  containerHeight: number
): HexagonConfigInterface {
  const calculatedImages: number = Math.ceil(
    containerWidth / (HEXAGON_WIDTH / HEXAGON_WIDTH_FACTOR)
  )
  const calculatedRows: number = Math.ceil(
    containerHeight / (HEXAGON_HEIGHT * HEXAGON_OVERLAP_FACTOR)
  )

  return {
    width: HEXAGON_WIDTH,
    height: HEXAGON_HEIGHT,
    containerWidth,
    containerHeight,
    imagesPerRow: calculatedImages,
    totalRows: calculatedRows,
  }
}
