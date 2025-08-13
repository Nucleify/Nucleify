import { onMounted, onUnmounted, ref } from 'vue'

import type {
  ElementsType,
  ElementType,
  UseInViewportInterface,
  ViewportStatusesType,
  ViewportStatusType,
} from 'atomic'

export function useInViewport(
  offset: number,
  ...selectors: string[]
): UseInViewportInterface {
  const viewportStatuses: ViewportStatusesType = ref<ViewportStatusType>(
    selectors.reduce(
      (status: ViewportStatusType, selector: string): ViewportStatusType => {
        status[selector] = false
        return status
      },
      {} as ViewportStatusType
    )
  )

  onMounted((): void => {
    const elements: ElementsType = selectors.map(
      (selector: string): ElementType => document.querySelector(selector)
    )

    function checkElementsInViewport(): void {
      viewportStatuses.value = selectors.reduce(
        (
          status: ViewportStatusType,
          selector: string,
          index: number
        ): ViewportStatusType => {
          const element: ElementType = elements[index]
          const offsetValue: number = offset

          if (element) {
            const rect: DOMRect = element.getBoundingClientRect()
            status[selector] =
              rect.bottom >= offsetValue &&
              rect.top <=
                (window.innerHeight || document.documentElement.clientHeight) -
                  offsetValue &&
              rect.right >= 0 &&
              rect.left <=
                (window.innerWidth || document.documentElement.clientWidth)
          } else {
            status[selector] = false
          }
          return status
        },
        {} as ViewportStatusType
      )
    }

    checkElementsInViewport()

    window.addEventListener('scroll', checkElementsInViewport)
    window.addEventListener('resize', checkElementsInViewport)

    onUnmounted((): void => {
      window.removeEventListener('scroll', checkElementsInViewport)
      window.removeEventListener('resize', checkElementsInViewport)
    })
  })

  return { viewportStatuses }
}
