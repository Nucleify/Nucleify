<template>
  <section
    ref="rootEl"
    id="stack"
    class="nuc-section nuc-stack nuc-panel"
    aria-labelledby="nuc-stack-title"
    :style="{ '--stack-color': active.color }"
  >
    <div class="nuc-stack-head">
      <p class="nuc-eyebrow">{{ copy.stackEyebrow }}</p>
      <h2 id="nuc-stack-title" class="nuc-title">
        {{ copy.stackTitle }}
      </h2>
      <p class="nuc-support">{{ copy.stackSupport }}</p>
      <button type="button" class="nuc-next" @click="onCta">
        <span>{{ copy.stackCta }}</span>
        <nui-icon icon="mdi:arrow-down" />
      </button>
    </div>

    <div
      class="nuc-stack-stage"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <div class="nuc-stack-spotlight" aria-live="polite">
        <div class="nuc-stack-glow" aria-hidden="true" />
        <div class="nuc-stack-badge">
          <nui-icon :icon="active.icon" />
        </div>
        <div class="nuc-stack-spotlight-copy">
          <p class="nuc-stack-kicker">{{ copy.stackStageLabel }}</p>
          <h3 class="nuc-stack-name">{{ active.label }}</h3>
          <p class="nuc-stack-detail">{{ active.detail }}</p>
          <p class="nuc-stack-command">
            <span>$</span>{{ active.command }}
          </p>
        </div>
      </div>

      <div class="nuc-stack-list" role="tablist" aria-label="Framework shells">
        <button
          v-for="(item, index) in stack"
          :key="item.label"
          type="button"
          role="tab"
          class="nuc-stack-item"
          :class="{ 'is-active': index === activeIndex }"
          :aria-selected="index === activeIndex"
          :style="{ '--item-color': item.color }"
          @mouseenter="select(index, false)"
          @focus="select(index, false)"
          @click="select(index, true)"
        >
          <span class="nuc-stack-item-icon" aria-hidden="true">
            <nui-icon :icon="item.icon" />
          </span>
          <span class="nuc-stack-label">{{ item.label }}</span>
          <span class="nuc-stack-item-detail">{{ item.detail }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import {
  cmsHomeStack,
  isAutomatedAudit,
  scrollSection,
  useCmsAttrs,
  useHomeCmsCopy,
  useShellSectionReveal,
} from '@web'
import { stackReveal } from './motion'

defineOptions({ inheritAttrs: false })

const rootEl = ref<HTMLElement | null>(null)
useShellSectionReveal(rootEl, stackReveal)

const cms = useCmsAttrs()
const copy = useHomeCmsCopy()
const stack = computed(() => cmsHomeStack(cms))
const activeIndex = ref(0)
const paused = ref(false)
const hovering = ref(false)

const active = computed(() => stack.value[activeIndex.value] ?? stack.value[0]!)

let timer: number | undefined

function onCta(): void {
  const root = document.querySelector<HTMLElement>('.nuc-shell')
  if (!root) return
  scrollSection(root, 'clone')
}

function select(index: number, lock = false): void {
  activeIndex.value = index
  if (lock) paused.value = true
}

function tick(): void {
  if (paused.value || hovering.value) return
  const len = stack.value.length
  if (len === 0) return
  activeIndex.value = (activeIndex.value + 1) % len
}

onMounted(() => {
  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    isAutomatedAudit()
  )
    return
  timer = window.setInterval(tick, 2600)
})

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
})
</script>

<style lang="scss" scoped>
@import 'index';
</style>
