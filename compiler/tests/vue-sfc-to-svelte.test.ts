import { describe, expect, it } from 'vitest'
import { convertVueSfcToSvelte } from '../src/sync/vue-sfc-to-svelte'
import { rewriteScriptSetupToReact } from '../src/sync/script-to-react'

describe('rewriteScriptSetupToReact → svelte import split', () => {
  it('emits useReactive as its own import entry (not glued to react)', () => {
    const rewritten = rewriteScriptSetupToReact(
      [
        "import { reactive, ref } from 'vue'",
        'const errors = reactive<{ email?: string }>({})',
        "const email = ref('')",
      ].join('\n'),
    )
    expect(rewritten.imports).toContain(
      "import { useReactive } from '@/lib/vue-reactivity-shim'",
    )
    expect(rewritten.imports.some((l) => l.includes("from 'react'") && l.includes('useReactive'))).toBe(
      false,
    )
    expect(rewritten.body.join('\n')).toContain('useReactive<{ email?: string }>({})')
  })
})

describe('convertVueSfcToSvelte', () => {
  it('emits Svelte 5 runes, $props, and template markup', () => {
    const { body, name } = convertVueSfcToSvelte(
      [
        '<template>',
        '  <button type="button" @click="n++">{{ n }}</button>',
        '</template>',
        '<script setup lang="ts">',
        "import { ref } from 'vue'",
        'const n = ref(0)',
        '</script>',
      ].join('\n'),
      'counter.vue',
    )
    expect(name).toBe('Counter')
    expect(body).toContain('<script lang="ts">')
    expect(body).toContain('let n = $state(0)')
    expect(body).toContain('onclick=')
    expect(body).toContain('{n}')
    expect(body).not.toContain('useState')
    expect(body).not.toContain("from 'react'")
    expect(body).not.toContain("from 'vue'")
  })

  it('maps defineProps / defineEmits onto $props', () => {
    const { body } = convertVueSfcToSvelte(
      [
        '<template>',
        '  <button type="button" @click="$emit(\'focus\', id)">{{ label }}</button>',
        '</template>',
        '<script setup lang="ts">',
        'defineProps<{',
        '  label: string',
        '  id: string',
        '}>()',
        'defineEmits<{',
        '  focus: [id: string]',
        '}>()',
        '</script>',
      ].join('\n'),
      'chip.vue',
    )
    expect(body).toContain('$props()')
    expect(body).toMatch(/label/)
    expect(body).toMatch(/onFocus/)
    expect(body).not.toContain('defineProps')
    expect(body).not.toContain('defineEmits')
  })

  it('rewrites computed / watch into $derived / $effect', () => {
    const { body } = convertVueSfcToSvelte(
      [
        '<template>',
        '  <p>{{ label }}</p>',
        '</template>',
        '<script setup lang="ts">',
        "import { computed, ref, watch } from 'vue'",
        "const focusId = ref('sdk')",
        "const label = computed(() => focusId.value.toUpperCase())",
        'watch(',
        '  () => focusId.value,',
        '  () => {',
        "    focusId.value = 'ui'",
        '  }',
        ')',
        '</script>',
      ].join('\n'),
      'lane.vue',
    )
    expect(body).toContain("let focusId = $state('sdk')")
    expect(body).toContain('let label = $derived(')
    expect(body).toContain('$effect(')
    expect(body).not.toContain('useMemo')
    expect(body).not.toContain('useEffect')
  })

  it('injects useId shim for SVG filter ids', () => {
    const { body } = convertVueSfcToSvelte(
      [
        '<template>',
        '  <svg><filter :id="`${uid}-bloom`" /></svg>',
        '</template>',
        '<script setup lang="ts">',
        "import { useId } from 'vue'",
        'const uid = `h${useId().replace(/[^a-zA-Z0-9]/g, "")}`',
        '</script>',
      ].join('\n'),
      'holo_cube.vue',
    )
    expect(body).toContain("import { useId } from '@/lib/svelte-react-shims'")
    expect(body).toContain('useId()')
    expect(body).not.toContain("from 'vue'")
    expect(body).not.toContain("from 'react'")
  })

  it('keeps useReactive after svelte convert (contact form errors)', () => {
    const { body } = convertVueSfcToSvelte(
      [
        '<template>',
        '  <p v-if="errors.email">{{ errors.email }}</p>',
        '</template>',
        '<script setup lang="ts">',
        "import { reactive, ref } from 'vue'",
        'const errors = reactive<{ email?: string }>({})',
        "const email = ref('')",
        'function clearErrors() {',
        '  delete errors.email',
        '}',
        '</script>',
      ].join('\n'),
      'close.vue',
    )
    expect(body).toContain("import { useReactive } from '@/lib/vue-reactivity-shim'")
    expect(body).toContain('useReactive<{ email?: string }>({})')
    expect(body).toContain("let email = $state('')")
  })

  it('hoists defineAsyncComponent to a static import (no lazy/Suspense)', () => {
    const { body } = convertVueSfcToSvelte(
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
    expect(body).toContain("import NucHomePillars from './sections/pillars/index.vue'")
    expect(body).toContain('NucHomeHero')
    expect(body).toContain('NucHomePillars')
    expect(body).not.toContain('lazy')
    expect(body).not.toContain('Suspense')
  })

  it('binds Vue $event for emit/setter handlers', () => {
    const { body } = convertVueSfcToSvelte(
      [
        '<template>',
        '  <NucHomeHoloCube :focus="focusId" @focus="focusId = $event" />',
        '</template>',
        '<script setup lang="ts">',
        "import { ref } from 'vue'",
        "const focusId = ref('sdk')",
        '</script>',
      ].join('\n'),
      'intro.vue',
    )
    // Svelte product emit uses onFocus / $event parameter (not unbound $event).
    expect(body).toMatch(/\$event/)
    expect(body).toContain("let focusId = $state('sdk')")
    expect(body).not.toMatch(/onFocus=\{\(\)\s*=>/)
  })

  it('renders v-if / v-for as Svelte blocks', () => {
    const { body } = convertVueSfcToSvelte(
      [
        '<template>',
        '  <ul>',
        '    <li v-for="(item, index) in items" :key="item.id">',
        '      <span v-if="item.on">{{ item.name }}</span>',
        '    </li>',
        '  </ul>',
        '</template>',
        '<script setup lang="ts">',
        'const items = [{ id: 1, name: "a", on: true }]',
        '</script>',
      ].join('\n'),
      'list.vue',
    )
    expect(body).toContain('{#each')
    expect(body).toContain('{#if')
    expect(body).toContain('{/each}')
    expect(body).toContain('{/if}')
  })

  it('throws when template is missing', () => {
    expect(() =>
      convertVueSfcToSvelte('<script setup lang="ts">const n = 1</script>', 'bare.vue'),
    ).toThrow(/template/i)
  })
})
