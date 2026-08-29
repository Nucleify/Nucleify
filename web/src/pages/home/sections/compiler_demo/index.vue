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
    </div>

    <div
      class="nuc-home-compiler-stage"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <svg
        class="nuc-home-compiler-edges"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            v-for="node in nodes"
            :id="`emit-grad-${node.id}`"
            :key="`g-${node.id}`"
            gradientUnits="userSpaceOnUse"
            :x1="HUB.x"
            :y1="HUB.y"
            :x2="node.x"
            :y2="node.y"
          >
            <stop
              offset="0%"
              stop-color="var(--home-accent)"
              stop-opacity="0.55"
            />
            <stop offset="100%" :stop-color="node.color" />
          </linearGradient>
        </defs>

        <path
          v-for="node in nodes"
          :key="`base-${node.id}`"
          class="nuc-home-compiler-edge-base"
          :d="edgePath(node)"
        />
        <path
          v-for="node in nodes"
          :key="`flow-${node.id}`"
          class="nuc-home-compiler-edge-flow"
          :class="{ 'is-active': node.id === active.id }"
          :d="edgePath(node)"
          :stroke="`url(#emit-grad-${node.id})`"
        />
      </svg>

      <div class="nuc-home-compiler-hub" aria-hidden="true">
        <span class="nuc-home-compiler-hub-glow" />
        <span class="nuc-home-compiler-hub-cube">
          <span class="nuc-home-compiler-hub-face">{{ copy.compilerHub }}</span>
        </span>
        <span class="nuc-home-compiler-hub-label"
          >{{ copy.compilerHubLabel }}</span
        >
      </div>

      <button
        v-for="node in nodes"
        :key="node.id"
        type="button"
        class="nuc-home-compiler-node"
        :class="{ 'is-active': node.id === active.id }"
        :style="nodeStyle(node)"
        :aria-pressed="node.id === active.id"
        :aria-label="`${copy.compilerEmitLabel} ${node.label}`"
        @mouseenter="select(node.id, false)"
        @focus="select(node.id, false)"
        @click="select(node.id, true)"
      >
        <span class="nuc-home-compiler-cube" aria-hidden="true">
          <span class="nuc-home-compiler-cube-face">
            <nui-icon :icon="node.icon" />
          </span>
        </span>
        <span class="nuc-home-compiler-node-meta">
          <span class="nuc-home-compiler-node-name">{{ node.label }}</span>
          <span class="nuc-home-compiler-node-cmd">${{ node.command }}</span>
        </span>
      </button>

      <p class="nuc-home-compiler-status" aria-live="polite">
        <span class="nuc-home-compiler-status-dot" />
        {{ copy.compilerEmitLabel }}
        <strong>{{ active.label }}</strong>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import {
  NUC_HOME_COMPILER_NODES,
  NUC_HOME_COPY,
  type NucHomeCompilerNode,
} from '../../constants/content'

const HUB = { x: 50, y: 48 } as const

const copy = NUC_HOME_COPY
const nodes = NUC_HOME_COMPILER_NODES
const activeId = ref(nodes[0]!.id)
const paused = ref(false)
const hovering = ref(false)

const active = computed(
  () => nodes.find((n) => n.id === activeId.value) ?? nodes[0]!
)

function nodeStyle(node: NucHomeCompilerNode): Record<string, string> {
  return {
    left: `${node.x}%`,
    top: `${node.y}%`,
    '--node-color': node.color,
  }
}

/** Straight spoke from hub center → shell cube center. */
function edgePath(node: NucHomeCompilerNode): string {
  return `M ${HUB.x} ${HUB.y} L ${node.x} ${node.y}`
}

function select(id: string, lock = false): void {
  activeId.value = id
  if (lock) paused.value = true
}

let timer: number | undefined

function tick(): void {
  if (paused.value || hovering.value) return
  const idx = nodes.findIndex((n) => n.id === activeId.value)
  const next = nodes[(idx + 1) % nodes.length]
  if (next) activeId.value = next.id
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = window.setInterval(tick, 2400)
})

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
})
</script>

<style lang="scss" scoped>
@import 'index';
</style>
