import { computed, defineComponent, h, type PropType, type VNode } from 'vue'

import FramePageFooter from './frame_page_footer.vue'

import { isKnownCmsSection, resolveCmsSection } from '../cms/registry'
import {
  orderedKnownSections,
  sectionBindAttrs,
  uniqueAnchorsBySectionId,
} from '../cms/section_runtime'
import type { PageSection } from '../cms/validate_layout'
import { useFramePage } from '../composables/use_frame_page'

function resolveVnodeEl(vnode: VNode): HTMLElement | null {
  let node: VNode | null | undefined = vnode
  // Async / stateful wrappers may nest before the real element root.
  while (node && (node.el == null || (node.el as Node).nodeType !== 1)) {
    const kids: unknown = node.component?.subTree
      ? [node.component.subTree]
      : node.children
    if (!Array.isArray(kids) || !kids.length) break
    node = kids.find((k): k is VNode => !!k && typeof k === 'object') ?? null
  }
  const el = node?.el as HTMLElement | null | undefined
  return el && el.nodeType === 1 ? el : null
}

function stampSectionEl(vnode: VNode, sectionId: string, anchor: string): void {
  const el = resolveVnodeEl(vnode)
  if (!el) return
  el.id = anchor
  el.setAttribute('data-section-id', sectionId)
}

function selectorForSectionId(sectionId: string): string {
  const safe =
    typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
      ? CSS.escape(sectionId)
      : sectionId.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
  return `[data-section-id="${safe}"]`
}

/** Render-fn host — avoids template `v-bind="obj"` (compiler convert cannot emit it). */
export default defineComponent({
  name: 'FrameSections',
  props: {
    sections: {
      type: Array as PropType<PageSection[]>,
      default: () => [],
    },
  },
  setup(props) {
    const frame = useFramePage()
    const known = computed(() => orderedKnownSections(props.sections))
    const anchors = computed(() => uniqueAnchorsBySectionId(props.sections))
    const unknown = computed(() =>
      [...(props.sections ?? [])].filter((s) => !isKnownCmsSection(s.type))
    )

    return () => {
      const list = known.value
      const lastId = list[list.length - 1]?.id
      const nodes: VNode[] = [
        ...list.flatMap((section) => {
          const Comp = resolveCmsSection(section.type)
          if (!Comp) return []
          const anchor =
            anchors.value.get(section.id) ||
            section.id.replace(/[^a-zA-Z0-9_-]/g, '-') ||
            section.id
          return [
            h(Comp, {
              key: section.id,
              ...sectionBindAttrs(section, {
                anchor,
                frameLast: section.id === lastId,
              }),
              onVnodeMounted: (vnode: VNode) =>
                stampSectionEl(vnode, section.id, anchor),
              onVnodeUpdated: (vnode: VNode) =>
                stampSectionEl(vnode, section.id, anchor),
            }),
          ]
        }),
        ...unknown.value.map((section) =>
          h(
            'p',
            {
              key: `unknown-${section.id}`,
              class: 'nuc-frame__unknown',
            },
            `Unknown section type: ${section.type}`
          )
        ),
      ]

      // Teleport into last panel (snap-visible). Absolute CSS keeps width
      // out of pulse/section grid tracks.
      if (frame.value.showFooter !== false && lastId) {
        nodes.push(
          h(FramePageFooter, {
            key: 'frame-page-footer',
            to: selectorForSectionId(lastId),
          })
        )
      }

      return nodes
    }
  },
})
