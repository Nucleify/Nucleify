<template>
  <section
    id="surface"
    class="nuc-home-section nuc-inv-reach nuc-home-panel"
    aria-labelledby="nuc-investor-surface-title"
    :style="{ '--reach-i': activeIndex, '--reach-color': active.color }"
  >
    <header class="nuc-inv-reach-head">
      <p class="nuc-home-eyebrow">{{ copy.surfaceEyebrow }}</p>
      <h2 id="nuc-investor-surface-title" class="nuc-home-title">
        {{ copy.surfaceTitle }}
      </h2>
      <p class="nuc-home-support">{{ copy.surfaceSupport }}</p>
    </header>

    <div class="nuc-inv-reach-stage">
      <div
        class="nuc-inv-reach-spotlight"
        role="tabpanel"
        :aria-label="copy.surfaceStageLabel"
        :aria-labelledby="`nuc-reach-tab-${active.id}`"
      >
        <div class="nuc-inv-reach-glow" aria-hidden="true" />
        <div
          v-for="item in surface"
          :key="item.id"
          class="nuc-inv-reach-panel"
          :class="{ 'is-active': activeId === item.id }"
          :aria-hidden="activeId !== item.id"
        >
          <div class="nuc-inv-reach-badge" aria-hidden="true">
            <nui-icon :icon="item.icon" mode="svg" />
          </div>
          <p class="nuc-inv-reach-kicker">{{ item.metric }}</p>
          <h3 class="nuc-inv-reach-name">{{ item.title }}</h3>
          <p class="nuc-inv-reach-outcome">{{ item.outcome }}</p>
          <p class="nuc-inv-reach-desc">{{ item.description }}</p>
          <p class="nuc-inv-reach-proof">{{ item.proof }}</p>
        </div>
      </div>

      <div
        class="nuc-inv-reach-list"
        role="tablist"
        :aria-label="copy.surfaceTabsLabel"
      >
        <button
          v-for="(item, i) in surface"
          :id="`nuc-reach-tab-${item.id}`"
          :key="item.id"
          type="button"
          class="nuc-inv-reach-tab"
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
          <span class="nuc-inv-reach-tab-icon" aria-hidden="true">
            <nui-icon :icon="item.icon" mode="svg" />
          </span>
          <span class="nuc-inv-reach-tab-copy">
            <span class="nuc-inv-reach-tab-index">{{ item.index }}</span>
            <span class="nuc-inv-reach-tab-title">{{ item.title }}</span>
          </span>
          <span class="nuc-inv-reach-tab-metric">{{ item.metric }}</span>
        </button>
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
  document.getElementById(`nuc-reach-tab-${item.id}`)?.focus()
}
</script>
