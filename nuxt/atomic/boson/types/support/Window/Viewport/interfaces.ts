import type { Ref } from 'vue'

export interface UseInViewportInterface {
  viewportStatuses: Ref<Record<string, boolean>>
}
