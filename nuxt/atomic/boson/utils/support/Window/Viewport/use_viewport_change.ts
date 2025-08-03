import { onMounted, ref, watch } from 'vue'

import type {
  UseInViewportInterface,
  ViewportStatusesType,
  ViewportStatusType,
} from 'atomic'
import { useInViewport } from 'atomic'

export function useViewportChange(selectors: string[], offset?: number): void {
  const { viewportStatuses }: UseInViewportInterface = useInViewport(
    offset ? offset : 0,
    ...selectors
  )
  const isInViewport: ViewportStatusesType = ref<ViewportStatusType>({})

  selectors.forEach((selector: string): void => {
    isInViewport.value[selector] = viewportStatuses.value[selector]
  })

  function onEnter(selector: string): void {
    document.querySelector(selector)?.classList.add('fade-in')
    document.querySelector(selector)?.classList.remove('fade-out')
  }

  function onLeave(selector: string): void {
    document.querySelector(selector)?.classList.add('fade-out')
    document.querySelector(selector)?.classList.remove('fade-in')
  }

  watch(
    () => viewportStatuses.value,
    (newStatuses: ViewportStatusType): void => {
      selectors.forEach((selector: string): void => {
        const prevStatus: boolean = isInViewport.value[selector]
        const newStatus: boolean = newStatuses[selector]

        if (prevStatus !== newStatus) {
          isInViewport.value[selector] = newStatus

          if (newStatus) {
            onEnter(selector)
          } else {
            onLeave(selector)
          }
        }
      })
    },
    { immediate: true }
  )

  onMounted((): void => {
    selectors.forEach((selector: string): void => {
      const status: boolean = isInViewport.value[selector]
      if (status) {
        onEnter(selector)
      } else {
        onLeave(selector)
      }
    })
  })
}
