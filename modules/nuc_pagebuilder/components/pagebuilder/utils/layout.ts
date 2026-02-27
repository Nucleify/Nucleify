import { PAGE_BUILDER_WIDGETS } from '../constants/widgets'
import type {
  PageBuilderLayoutInterface,
  PageBuilderNodeInterface,
} from '../types'

function createId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

export function createLayout(): PageBuilderLayoutInterface {
  return {
    id: createId(),
    type: 'page',
    settings: {},
    children: [],
  }
}

export function createNode(widgetKey: string): PageBuilderNodeInterface {
  const widget = PAGE_BUILDER_WIDGETS.find((item) => item.key === widgetKey)
  const type = widget?.type ?? 'text'

  const baseProps =
    type === 'component'
      ? {
          componentTag: widget?.componentTag ?? 'div',
          componentProps: widget?.defaultProps ?? {},
        }
      : (widget?.defaultProps ?? {})

  return {
    id: createId(),
    type: 'widget',
    widgetType: type,
    props: baseProps,
    styles: {},
    children: [],
  }
}
