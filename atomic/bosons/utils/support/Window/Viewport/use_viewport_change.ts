import { ref, onMounted, watch } from 'vue'

import {
  UseInViewportInterface,
  ViewportStatusType,
  ViewportStatusesType,
} from 'atomic/bosons/types'
import { useInViewport } from 'atomic/bosons/utils'

export function useViewportChange(selectors: string[], offset: number): void {
  const { viewportStatuses }: UseInViewportInterface = useInViewport(
    offset,
    ...selectors
  )
  const isInViewport: ViewportStatusesType = ref<ViewportStatusType>({})

  selectors.forEach((selector: string): void => {
    isInViewport.value[selector] = viewportStatuses.value[selector]
  })

  function onEnter(selector: string): void {
    document.querySelector(selector + ' div')?.classList.add('fade-in')
    document.querySelector(selector + ' div')?.classList.remove('fade-out')
  }

  function onLeave(selector: string): void {
    document.querySelector(selector + ' div')?.classList.add('fade-out')
    document.querySelector(selector + ' div')?.classList.remove('fade-in')
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
