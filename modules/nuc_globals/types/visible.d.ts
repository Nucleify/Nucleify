import type { Ref } from 'vue'

export {}

declare global {
  type VisibleType = Ref<boolean | undefined>
}
