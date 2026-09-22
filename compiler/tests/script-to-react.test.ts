import { describe, expect, it } from 'vitest'
import { rewriteScriptSetupToReact } from '../src/sync/script-to-react'
import { convertVueSfcToReact } from '../src/sync/vue-sfc-to-tsx'

describe('rewriteScriptSetupToReact', () => {
  it('unwraps typed computed arrows into useMemo values', () => {
    const { body } = rewriteScriptSetupToReact(
      [
        "import { computed, ref } from 'vue'",
        "const focusId = ref('sdk')",
        'const focused = computed(',
        '  (): Lane => items.find((lane) => lane.id === focusId.value) ?? items[0]!',
        ')',
      ].join('\n'),
    )
    const joined = body.join('\n')
    expect(joined).toContain('useMemo(() => items.find((lane) => lane.id === focusId) ?? items[0]!')
    expect(joined).not.toContain('() => (): Lane =>')
  })

  it('maps watch getters onto useEffect with value deps', () => {
    const { body } = rewriteScriptSetupToReact(
      [
        "import { computed, ref, watch } from 'vue'",
        'const focusId = ref("sdk")',
        'const active = computed(() => modules[0]!)',
        'watch(',
        '  () => active.value.id,',
        '  () => {',
        '    focusId.value = "sdk"',
        '  }',
        ')',
      ].join('\n'),
    )
    const joined = body.join('\n')
    expect(joined).toContain('useEffect(() => {')
    expect(joined).toContain('void (() => {')
    expect(joined).toContain('setFocusId("sdk")')
    expect(joined).toContain('}, [active.id])')
    expect(joined).not.toContain('})(() => active.id)')
    expect(joined).not.toContain('[() => active.id]')
  })

  it('preserves ref type params on useState', () => {
    const { body } = rewriteScriptSetupToReact(
      [
        "import { ref } from 'vue'",
        "import type { NucHomeModuleLaneId } from './content'",
        "const focusId = ref<NucHomeModuleLaneId>('sdk')",
      ].join('\n'),
    )
    expect(body.join('\n')).toContain(
      "const [focusId, setFocusId] = useState<NucHomeModuleLaneId>('sdk')",
    )
  })

  it('rewrites KeyboardEvent params for React handlers', () => {
    const { body } = rewriteScriptSetupToReact(
      [
        "import { ref } from 'vue'",
        'function onTabKey(event: KeyboardEvent): void {',
        '  event.preventDefault()',
        '}',
      ].join('\n'),
    )
    const joined = body.join('\n')
    expect(joined).toContain('currentTarget: EventTarget | null')
    expect(joined).not.toMatch(/event: KeyboardEvent\b/)
  })

  it('maps defineProps and defineEmits onto React props', () => {
    const rewritten = rewriteScriptSetupToReact(
      [
        "import { useId } from 'vue'",
        "import type { Lane } from './content'",
        'defineProps<{',
        '  focus: Lane',
        '  compact?: boolean',
        '  faces: Array<{ id: Lane; label: string }>',
        '}>()',
        'defineEmits<{',
        '  focus: [id: Lane]',
        '}>()',
        'const uid = `h${useId().replace(/[^a-zA-Z0-9]/g, "")}`',
      ].join('\n'),
    )
    expect(rewritten.body.join('\n')).not.toContain('defineProps')
    expect(rewritten.body.join('\n')).not.toContain('defineEmits')
    expect(rewritten.propNames).toEqual(['focus', 'compact', 'faces'])
    expect(rewritten.emitHandlers).toEqual(['onFocus'])
    expect(rewritten.emitFields[0]).toContain('onFocus?:')
    expect(rewritten.imports.join('\n')).toContain('useId')
  })
})

describe('convertVueSfcToReact', () => {
  it('hoists lazy() to module scope and wraps only that component', () => {
    const { body } = convertVueSfcToReact(
      [
        '<template>',
        '  <div>',
        '    <NucHomeHero />',
        '    <NucHomePillars />',
        '  </div>',
        '</template>',
        '<script setup lang="ts">',
        "import { defineAsyncComponent } from 'vue'",
        "import NucHomeHero from './sections/hero/index.vue'",
        'const NucHomePillars = defineAsyncComponent(',
        "  () => import('./sections/pillars/index.vue')",
        ')',
        '</script>',
      ].join('\n'),
      'home.vue',
    )
    const lazyIdx = body.indexOf('const NucHomePillars = lazy')
    const fnIdx = body.indexOf('export default function')
    expect(lazyIdx).toBeGreaterThan(-1)
    expect(fnIdx).toBeGreaterThan(-1)
    expect(lazyIdx).toBeLessThan(fnIdx)
    expect(body).toContain('<Suspense fallback={null}>')
    expect(body).toContain('<NucHomePillars />')
    expect(body).not.toMatch(/<Suspense fallback=\{null\}>\s*<div/)
  })

  it('emits inner Vue <template> as React fragments', () => {
    const { body } = convertVueSfcToReact(
      [
        '<template>',
        '  <p>',
        '    <template v-if="on">A</template>',
        '    <template v-else>B</template>',
        '  </p>',
        '</template>',
        '<script setup lang="ts">',
        'const on = true',
        '</script>',
      ].join('\n'),
      'pulse.vue',
    )
    expect(body).not.toMatch(/<template[\s>]/)
    expect(body).toContain('<>')
    expect(body).toContain('</>')
  })
})
