<template>
  <section
    id="stack"
    class="nuc-home-section nuc-home-stack nuc-home-panel"
    aria-labelledby="nuc-home-stack-title"
    :style="{ '--stack-color': active.color }"
  >
    <div class="nuc-home-stack-head">
      <p class="nuc-home-eyebrow">{{ copy.stackEyebrow }}</p>
      <h2 id="nuc-home-stack-title" class="nuc-home-title">
        {{ copy.stackTitle }}
      </h2>
      <p class="nuc-home-support">{{ copy.stackSupport }}</p>
    </div>

    <div
      class="nuc-home-stack-stage"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <div class="nuc-home-stack-spotlight" aria-live="polite">
        <div class="nuc-home-stack-glow" aria-hidden="true" />
        <div class="nuc-home-stack-badge">
          <nui-icon :icon="active.icon" />
        </div>
        <div class="nuc-home-stack-spotlight-copy">
          <p class="nuc-home-stack-kicker">{{ copy.stackStageLabel }}</p>
          <h3 class="nuc-home-stack-name">{{ active.label }}</h3>
          <p class="nuc-home-stack-detail">{{ active.detail }}</p>
          <p class="nuc-home-stack-command">
            <span>$</span>{{ active.command }}
          </p>
        </div>
      </div>

      <div
        class="nuc-home-stack-list"
        role="tablist"
        aria-label="Framework shells"
      >
        <button
          v-for="(item, index) in stack"
          :key="item.label"
          type="button"
          role="tab"
          class="nuc-home-stack-item"
          :class="{ 'is-active': index === activeIndex }"
          :aria-selected="index === activeIndex"
          :style="{ '--item-color': item.color }"
          @mouseenter="select(index, false)"
          @focus="select(index, false)"
          @click="select(index, true)"
        >
          <span class="nuc-home-stack-item-icon" aria-hidden="true">
            <nui-icon :icon="item.icon" />
          </span>
          <span class="nuc-home-stack-label">{{ item.label }}</span>
          <span class="nuc-home-stack-item-detail">{{ item.detail }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import { NUC_HOME_COPY, NUC_HOME_STACK } from '../../constants/content'

const copy = NUC_HOME_COPY
const stack = NUC_HOME_STACK
const activeIndex = ref(0)
const paused = ref(false)
const hovering = ref(false)

const active = computed(() => stack[activeIndex.value] ?? stack[0]!)

let timer: number | undefined

function select(index: number, lock = false): void {
  activeIndex.value = index
  if (lock) paused.value = true
}

function tick(): void {
  if (paused.value || hovering.value) return
  activeIndex.value = (activeIndex.value + 1) % stack.length
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  timer = window.setInterval(tick, 2600)
})

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
})
</script>

<style lang="scss" scoped>
@import 'index';
</style>
