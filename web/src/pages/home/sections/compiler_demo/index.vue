<template>
  <section
    id="compiler"
    class="nuc-home-section nuc-home-compiler nuc-home-panel"
    aria-labelledby="nuc-home-compiler-title"
    :style="{ '--emit-color': active.color }"
  >
    <div class="nuc-home-compiler-copy">
      <p class="nuc-home-eyebrow">{{ copy.compilerEyebrow }}</p>
      <h2 id="nuc-home-compiler-title" class="nuc-home-title">
        {{ copy.compilerTitle }}
      </h2>
      <p class="nuc-home-support">{{ copy.compilerSupport }}</p>
      <a :href="docsHref" class="nuc-home-next">
        <span>{{ copy.compilerCta }}</span>
        <nui-icon icon="mdi:arrow-right" />
      </a>
    </div>

    <div
      class="nuc-home-compiler-board"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <div class="nuc-home-compiler-window">
        <ol class="nuc-home-compiler-code" :key="active.id">
          <li
            v-for="(line, index) in active.snippet"
            :key="`${active.id}-${index}`"
          >
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            <code :class="{ 'is-tag': isTag(line) }">{{ line || ' ' }}</code>
          </li>
        </ol>

        <div class="nuc-home-compiler-shells" role="tablist">
          <button
            v-for="node in NUC_HOME_COMPILER_NODES"
            :key="node.id"
            type="button"
            role="tab"
            class="nuc-home-compiler-shell"
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
  homeDocsHref,
  NUC_HOME_COMPILER_NODES,
  NUC_HOME_COPY,
} from '../../constants/content'
import { isAutomatedAudit } from '../../utils/is_automated_audit'

const copy = NUC_HOME_COPY
const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')
const docsHref = computed(() => homeDocsHref(lang.value, 'compiler'))
const activeId = ref(NUC_HOME_COMPILER_NODES[0]!.id)
const paused = ref(false)
const hovering = ref(false)

const active = computed(
  () =>
    NUC_HOME_COMPILER_NODES.find((n) => n.id === activeId.value) ??
    NUC_HOME_COMPILER_NODES[0]!
)

function isTag(line: string): boolean {
  return (
    /<\/?(script|template|nui-button|NuiButton)\b/.test(line) ||
    line.trim() === '---'
  )
}

function select(id: string, lock = false): void {
  activeId.value = id
  if (lock) paused.value = true
}

let timer: number | undefined

function tick(): void {
  if (paused.value || hovering.value) return
  const list = NUC_HOME_COMPILER_NODES
  const idx = list.findIndex((n) => n.id === activeId.value)
  const next = list[(idx + 1) % list.length]
  if (next) activeId.value = next.id
}

onMounted(() => {
  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    isAutomatedAudit()
  )
    return
  timer = window.setInterval(tick, 2400)
})

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
})
</script>

<style lang="scss" scoped>
@import 'index';
</style>
