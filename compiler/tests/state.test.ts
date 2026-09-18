import { describe, expect, it } from 'vitest'
import { emitReact } from '../src/emit/react'
import { emitVue } from '../src/emit/vue'
import { parseTsxToIr } from '../src/parse/tsx'
import { derived, handler, state } from '../runtime/index'

describe('phase 7 state', () => {
  it('runtime markers are host-agnostic stubs', () => {
    const cell = state(1)
    expect(cell.value).toBe(1)
    cell.set(2)
    expect(cell.value).toBe(1)
    expect(derived(() => 3).value).toBe(3)
    const fn = handler(() => 4)
    expect(fn()).toBe(4)
  })

  it('emits Vue ref/computed and React useState/useMemo', () => {
    const ir = parseTsxToIr(
      `import { component, state, derived, handler } from '#nuc-compiler/runtime'
export default component({
  name: 'C',
  setup() {
    const n = state(0)
    const d = derived(() => n.value + 1)
    const onInc = handler(() => { n.set(n.value + 1) })
    return () => <button onClick={onInc}>{d.value}</button>
  },
})
`,
      'c.nuc.tsx',
    )
    const vue = emitVue(ir)
    expect(vue).toContain("import { ref, computed } from 'vue'")
    expect(vue).toContain('const n = ref(0)')
    expect(vue).toContain('const d = computed(() =>')
    expect(vue).toContain('n.value =')

    const react = emitReact(ir)
    expect(react).toContain("import { useState, useMemo } from 'react'")
    expect(react).toContain('const [n, setN] = useState(0)')
    expect(react).toContain('useMemo(() =>')
    expect(react).toContain('setN(')
  })
})
