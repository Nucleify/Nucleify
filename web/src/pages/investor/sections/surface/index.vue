<template>
  <section
    id="surface"
    class="nuc-home-section nuc-investor-surface nuc-home-panel"
    aria-labelledby="nuc-investor-surface-title"
  >
    <header class="nuc-investor-surface-intro">
      <p class="nuc-home-eyebrow">{{ copy.surfaceEyebrow }}</p>
      <h2 id="nuc-investor-surface-title" class="nuc-home-title">
        {{ copy.surfaceTitle }}
      </h2>
      <p class="nuc-home-support">{{ copy.surfaceSupport }}</p>
    </header>

    <div
      class="nuc-investor-surface-board"
      :style="{ '--active-i': activeIndex }"
    >
      <div
        class="nuc-investor-surface-tabs"
        role="tablist"
        :aria-label="copy.surfaceTabsLabel"
      >
        <button
          v-for="(item, i) in surface"
          :id="`nuc-surface-tab-${item.id}`"
          :key="item.id"
          type="button"
          class="nuc-investor-surface-tab"
          :class="{ 'is-active': activeId === item.id }"
          role="tab"
          :aria-selected="activeId === item.id"
          :aria-controls="`nuc-surface-panel-${item.id}`"
          :tabindex="activeId === item.id ? 0 : -1"
          :data-index="i"
          @mouseenter="activeId = item.id"
          @focus="activeId = item.id"
          @click="activeId = item.id"
          @keydown="onTabKey"
        >
          <span class="nuc-investor-surface-tab-index">{{ item.index }}</span>
          <span class="nuc-investor-surface-tab-title">{{ item.title }}</span>
          <span class="nuc-investor-surface-tab-metric">{{ item.metric }}</span>
        </button>
        <span class="nuc-investor-surface-tabs-track" aria-hidden="true">
          <span class="nuc-investor-surface-tabs-thumb" />
        </span>
      </div>

      <div
        :id="`nuc-surface-panel-${active.id}`"
        class="nuc-investor-surface-stage"
        role="tabpanel"
        :aria-label="copy.surfaceStageLabel"
        :aria-labelledby="`nuc-surface-tab-${active.id}`"
      >
        <div class="nuc-investor-surface-stage-head">
          <p class="nuc-investor-surface-stage-index">{{ active.index }}</p>
          <div class="nuc-investor-surface-stage-copy">
            <h3 class="nuc-investor-surface-stage-title">{{ active.title }}</h3>
            <p class="nuc-investor-surface-stage-outcome">
              {{ active.outcome }}
            </p>
          </div>
          <p class="nuc-investor-surface-stage-metric">{{ active.metric }}</p>
        </div>
        <p class="nuc-investor-surface-stage-desc">{{ active.description }}</p>
        <p class="nuc-investor-surface-stage-proof">{{ active.proof }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import {
  NUC_INVESTOR_COPY,
  NUC_INVESTOR_SURFACE,
} from '../../constants/content'

const copy = NUC_INVESTOR_COPY
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
  const el = document.getElementById(`nuc-surface-tab-${item.id}`)
  el?.focus()
}
</script>
