import type { AnchorInterface } from 'nucleify'

import type { BreadcrumbProps } from 'primevue/breadcrumb'

export interface BreadcrumbInterface extends /* @vue-ignore */ BreadcrumbProps {
  items: AnchorInterface[]
  separator?: string
}
