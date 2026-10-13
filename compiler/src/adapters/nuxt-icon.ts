import type { IrAttr } from '../ir/types'

/**
 * Nuxt `<Icon name="mdi:…">` is auto-imported and not available after product convert.
 * Map to portable `<nui-icon icon="mdi:…">` (emit adds `mode="svg"` when missing).
 */
export function mapNuxtIconTag(
  tag: string,
  props: IrAttr[],
): { tag: string; props: IrAttr[] } {
  if (tag !== 'Icon') return { tag, props }
  const next = props.map((attr) => {
    if ((attr.kind === 'static' || attr.kind === 'bind') && attr.name === 'name') {
      return { ...attr, name: 'icon' }
    }
    return attr
  })
  return { tag: 'nui-icon', props: next }
}
