<template>
  <section
    ref="rootEl"
    id="architecture"
    class="nuc-section nuc-pillars nuc-panel"
    aria-labelledby="nuc-pillars-title"
  >
    <div class="nuc-pillars-head">
      <div class="nuc-pillars-pitch">
        <p class="nuc-eyebrow">{{ copy.pillarsEyebrow }}</p>
        <h2 id="nuc-pillars-title" class="nuc-title">
          {{ copy.pillarsTitle }}
        </h2>
        <p class="nuc-support">{{ copy.pillarsSupport }}</p>
        <button type="button" class="nuc-next nuc-pillars-cta" @click="onCta">
          <span>{{ copy.pillarsCta }}</span>
          <nui-icon icon="mdi:arrow-down" />
        </button>
      </div>

      <figure class="nuc-pillars-share">
        <div class="nuc-pillars-share-chart">
          <svg viewBox="0 0 100 100" role="img" :aria-label="shareLabel">
            <path
              v-for="arc in arcs"
              :key="arc.id"
              class="nuc-pillars-share-slice"
              :d="arc.d"
              :fill="arc.color"
              :stroke="arc.color"
            />
          </svg>
          <div class="nuc-pillars-share-hole">
            <strong>{{ stackCount }}</strong>
            <span>{{ copy.pillarsShareUnit }}</span>
          </div>
        </div>
        <figcaption class="nuc-pillars-share-legend">
          <ul>
            <li v-for="item in legend" :key="item.id">
              <i aria-hidden="true" :style="{ '--c1': item.color }" />
              <span>{{ item.label }}</span>
            </li>
          </ul>
          <p class="nuc-pillars-share-note">
            {{ copy.pillarsShareSource }}
          </p>
        </figcaption>
      </figure>
    </div>

    <div class="nuc-pillars-grid">
      <article
        v-for="pillar in pillars"
        :key="pillar.title"
        class="nuc-pillars-item"
      >
        <div class="nuc-pillars-item-top">
          <span class="nuc-pillars-icon" aria-hidden="true">
            <nui-icon :icon="pillar.icon" />
          </span>
          <span class="nuc-pillars-index">{{ pillar.index }}</span>
        </div>
        <h3 class="nuc-pillars-title">{{ pillar.title }}</h3>
        <p class="nuc-pillars-desc">{{ pillar.description }}</p>
        <div class="nuc-pillars-foot">
          <p class="nuc-pillars-outcome">{{ pillar.outcome }}</p>
          <p class="nuc-pillars-proof">{{ pillar.proof }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import {
  cmsHomePillars,
  nucHomeWebShareArcs,
  nucHomeWebShareLegend,
  NUC_HOME_WEB_SHARE,
  scrollSection,
  useCmsAttrs,
  useHomeCmsCopy,
  useShellSectionReveal,
} from '@web'
import { pillarsReveal } from './motion'

defineOptions({ inheritAttrs: false })

const rootEl = ref<HTMLElement | null>(null)
useShellSectionReveal(rootEl, pillarsReveal)

const cms = useCmsAttrs()
const copy = useHomeCmsCopy()
const pillars = computed(() => cmsHomePillars(cms))
const stackCount = NUC_HOME_WEB_SHARE.slices.length
const arcs = nucHomeWebShareArcs()
const legend = nucHomeWebShareLegend()
const shareLabel = computed(
  () => `Nucleify emits to ${stackCount} core web stacks`
)

function onCta(): void {
  const root = document.querySelector<HTMLElement>('.nuc-shell')
  if (!root) return
  scrollSection(root, 'stack')
}
</script>

<style lang="scss" scoped>
@import 'index';
</style>
