<template>
  <section
    ref="rootEl"
    id="surface"
    class="nuc-section nuc-surface nuc-panel"
    aria-labelledby="nuc-surface-title"
    :style="{ '--surface-i': activeIndex, '--surface-color': active.color }"
  >
    <header class="nuc-surface-head">
      <p class="nuc-eyebrow">{{ copy.surfaceEyebrow }}</p>
      <h2 id="nuc-surface-title" class="nuc-title">
        {{ copy.surfaceTitle }}
      </h2>
      <p class="nuc-support">{{ copy.surfaceSupport }}</p>
    </header>

    <div class="nuc-surface-stage">
      <div
        class="nuc-surface-spotlight"
        role="tabpanel"
        :aria-label="copy.surfaceStageLabel"
        :aria-labelledby="`nuc-surface-tab-${active.id}`"
      >
        <div class="nuc-surface-glow" aria-hidden="true" />
        <div
          v-for="item in surface"
          :key="item.id"
          class="nuc-surface-panel"
          :class="{ 'is-active': activeId === item.id }"
          :aria-hidden="activeId !== item.id"
        >
          <div class="nuc-surface-badge" aria-hidden="true">
            <nui-icon :icon="item.icon" mode="svg" />
          </div>
          <p class="nuc-surface-kicker">{{ item.metric }}</p>
          <h3 class="nuc-surface-name">{{ item.title }}</h3>
          <p class="nuc-surface-outcome">{{ item.outcome }}</p>
          <p class="nuc-surface-desc">{{ item.description }}</p>
          <p class="nuc-surface-proof">{{ item.proof }}</p>
        </div>
      </div>

      <div
        class="nuc-surface-list"
        role="tablist"
        :aria-label="copy.surfaceTabsLabel"
      >
        <button
          v-for="(item, i) in surface"
          :id="`nuc-surface-tab-${item.id}`"
          :key="item.id"
          type="button"
          class="nuc-surface-tab"
          :class="{ 'is-active': activeId === item.id }"
          :style="{ '--tab-color': item.color }"
          role="tab"
          :aria-selected="activeId === item.id"
          :tabindex="activeId === item.id ? 0 : -1"
          :data-index="i"
          @mouseenter="activeId = item.id"
          @focus="activeId = item.id"
          @click="activeId = item.id"
          @keydown="onTabKey"
        >
          <span class="nuc-surface-tab-icon" aria-hidden="true">
            <nui-icon :icon="item.icon" mode="svg" />
          </span>
          <span class="nuc-surface-tab-copy">
            <span class="nuc-surface-tab-index">{{ item.index }}</span>
            <span class="nuc-surface-tab-title">{{ item.title }}</span>
          </span>
          <span class="nuc-surface-tab-metric">{{ item.metric }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import {
  NUC_INVESTOR_SURFACE,
  useInvestorCmsCopy,
  useShellSectionReveal,
} from '@web'
import { surfaceReveal } from './motion'

defineOptions({ inheritAttrs: false })

const rootEl = ref<HTMLElement | null>(null)
useShellSectionReveal(rootEl, surfaceReveal)

const copy = useInvestorCmsCopy()
const surface = NUC_INVESTOR_SURFACE
const activeId = ref<(typeof surface)[number]['id']>(surface[0]!.id)

const activeIndex = computed(() =>
  Math.max(
    0,
    surface.findIndex((item) => item.id === activeId.value)
  )
)

const active = computed(
  () => surface.find((item) => item.id === activeId.value) ?? surface[0]!
)

function onTabKey(event: KeyboardEvent): void {
  const target = event.currentTarget as HTMLElement | null
  const index = Number(target?.dataset.index ?? Number.NaN)
  if (!Number.isFinite(index)) return

  let next = index
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    next = (index + 1) % surface.length
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    next = (index - 1 + surface.length) % surface.length
  } else if (event.key === 'Home') {
    next = 0
  } else if (event.key === 'End') {
    next = surface.length - 1
  } else {
    return
  }
  event.preventDefault()
  const item = surface[next]
  if (!item) return
  activeId.value = item.id
  document.getElementById(`nuc-surface-tab-${item.id}`)?.focus()
}
</script>

<style lang="scss" scoped>
@import 'index';
</style>
