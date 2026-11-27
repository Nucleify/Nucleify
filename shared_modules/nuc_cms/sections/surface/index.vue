<template>
  <section
    ref="rootEl"
    :id="domId"
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
          <div class="nuc-surface-top">
            <div class="nuc-surface-badge" aria-hidden="true">
              <nui-icon :icon="item.icon" mode="svg" />
            </div>
            <h3 class="nuc-surface-name">{{ item.title }}</h3>
            <p class="nuc-surface-kicker">{{ item.metric }}</p>
          </div>
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
          <span class="nuc-surface-tab-title">{{ item.title }}</span>
          <span class="nuc-surface-tab-metric">{{ item.metric }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import {
  coalesceArray,
  NUC_INVESTOR_SURFACE,
  rovingTabKeydown,
  surfaceReveal,
  useCmsAttrs,
  useFrameSectionReveal,
  useInvestorCmsCopy,
  useSectionDomId,
} from '@shared_modules'

defineOptions({ inheritAttrs: false })

const rootEl = ref<HTMLElement | null>(null)
useFrameSectionReveal(rootEl, surfaceReveal)

const cms = useCmsAttrs()
const domId = useSectionDomId('surface')
const copy = useInvestorCmsCopy()
const surface = coalesceArray(
  cms.items,
  NUC_INVESTOR_SURFACE
) as (typeof NUC_INVESTOR_SURFACE)[number][]
const activeId = ref(surface[0]!.id)

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
  rovingTabKeydown(event, surface.length, (next) => {
    const item = surface[next]
    if (!item) return
    activeId.value = item.id
    document.getElementById(`nuc-surface-tab-${item.id}`)?.focus()
  })
}
</script>

<style lang="scss" scoped>
@import 'index';
</style>
