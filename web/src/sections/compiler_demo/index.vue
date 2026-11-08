<template>
  <section
    ref="rootEl"
    id="compiler"
    class="nuc-section nuc-compiler nuc-panel"
    aria-labelledby="nuc-compiler-title"
    :style="{ '--emit-color': active.color }"
  >
    <div class="nuc-compiler-copy">
      <p class="nuc-eyebrow">{{ copy.compilerEyebrow }}</p>
      <h2 id="nuc-compiler-title" class="nuc-title nuc-compiler-title">
        <span class="nuc-compiler-title-line"
          >{{ copy.compilerTitleLead }}</span
        >
        <span class="nuc-compiler-title-line is-nowrap"
          >{{ copy.compilerTitleTrail }}</span
        >
      </h2>
      <p class="nuc-support">{{ copy.compilerSupport }}</p>
      <a :href="docsHref" class="nuc-next">
        <span>{{ copy.compilerCta }}</span>
        <nui-icon icon="mdi:arrow-right" />
      </a>
    </div>

    <div
      class="nuc-compiler-board"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <div class="nuc-compiler-window">
        <ol
          class="nuc-compiler-code"
          :key="active.id"
          :style="{ '--code-lines': maxLines }"
        >
          <li
            v-for="(line, index) in displayLines"
            :key="`${active.id}-${index}`"
            :class="{ 'is-pad': index >= active.snippet.length }"
            :aria-hidden="index >= active.snippet.length ? 'true' : undefined"
          >
            <span class="nuc-compiler-ln"
              >{{ String(index + 1).padStart(2, '0') }}</span
            >
            <code>
              <span
                v-for="(tok, tokIndex) in highlightSnippetLine(line)"
                :key="`${active.id}-${index}-${tokIndex}`"
                :class="`is-${tok.kind}`"
                >{{ tok.text }}</span
              >
            </code>
          </li>
        </ol>

        <div class="nuc-compiler-shells" role="tablist">
          <button
            v-for="node in nodes"
            :key="node.id"
            type="button"
            role="tab"
            class="nuc-compiler-shell"
            :class="{ 'is-active': node.id === active.id }"
            :style="{ '--node-color': node.color }"
            :aria-selected="node.id === active.id"
            @mouseenter="select(node.id, false)"
            @focus="select(node.id, false)"
            @click="select(node.id, true)"
          >
            <nui-icon :icon="node.icon" />
            <span>{{ node.label }}</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import {
  cmsHomeCompilerNodes,
  homeDocsHref,
  isAutomatedAudit,
  useCmsAttrs,
  useHomeCmsCopy,
  useShellSectionReveal,
} from '@web'
import { highlightSnippetLine } from './highlight'
import { compilerReveal } from './motion'

defineOptions({ inheritAttrs: false })

const rootEl = ref<HTMLElement | null>(null)
useShellSectionReveal(rootEl, compilerReveal)

const cms = useCmsAttrs()
const copy = useHomeCmsCopy()
const nodes = computed(() => cmsHomeCompilerNodes(cms))
const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')
const docsHref = computed(() => homeDocsHref(lang.value, 'compiler'))
const activeId = ref('')
const hovering = ref(false)
const ROTATE_MS = 10_000

const active = computed(() => {
  const list = nodes.value
  return list.find((n) => n.id === activeId.value) ?? list[0]!
})

/** Tallest emit snippet — pad shorter shells so the card height stays put. */
const maxLines = computed(() =>
  nodes.value.reduce((max, node) => Math.max(max, node.snippet.length), 0)
)

const displayLines = computed(() => {
  const lines = active.value.snippet
  const pad = maxLines.value - lines.length
  if (pad <= 0) return lines
  return [...lines, ...Array.from({ length: pad }, () => '')]
})

let timer: number | undefined
let rotateEnabled = false

function clearRotateTimer(): void {
  if (timer) {
    window.clearInterval(timer)
    timer = undefined
  }
}

function startRotateTimer(): void {
  clearRotateTimer()
  if (!rotateEnabled) return
  timer = window.setInterval(tick, ROTATE_MS)
}

function select(id: string, resetClock = false): void {
  activeId.value = id
  if (resetClock) startRotateTimer()
}

function tick(): void {
  if (hovering.value) return
  const list = nodes.value
  if (list.length === 0) return
  const idx = list.findIndex((n) => n.id === activeId.value)
  const next = list[(idx + 1) % list.length]
  if (next) activeId.value = next.id
}

onMounted(() => {
  activeId.value = nodes.value[0]?.id ?? ''
  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    isAutomatedAudit()
  )
    return
  rotateEnabled = true
  startRotateTimer()
})

onBeforeUnmount(() => {
  rotateEnabled = false
  clearRotateTimer()
})
</script>

<style lang="scss" scoped>
@import 'index';
</style>
