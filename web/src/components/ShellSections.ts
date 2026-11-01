import { computed, defineComponent, h, type PropType } from 'vue'

import type { PageSection } from '@shared_modules'
import {
  isKnownCmsSection,
  orderedKnownSections,
  resolveCmsSection,
  sectionBindAttrs,
} from '../cms/section_registry'

/** Render-fn host — avoids template `v-bind="obj"` (compiler convert cannot emit it). */
export default defineComponent({
  name: 'ShellSections',
  props: {
    sections: {
      type: Array as PropType<PageSection[]>,
      default: () => [],
    },
  },
  setup(props) {
    const known = computed(() => orderedKnownSections(props.sections))
    const unknown = computed(() =>
      [...(props.sections ?? [])].filter((s) => !isKnownCmsSection(s.type))
    )

    return () => [
      ...known.value.flatMap((section) => {
        const Comp = resolveCmsSection(section.type)
        if (!Comp) return []
        return [
          h(Comp, {
            key: section.id,
            ...sectionBindAttrs(section),
          }),
        ]
      }),
      ...unknown.value.map((section) =>
        h(
          'p',
          {
            key: `unknown-${section.id}`,
            class: 'nuc-shell__unknown',
          },
          `Unknown section type: ${section.type}`
        )
      ),
    ]
  },
})
