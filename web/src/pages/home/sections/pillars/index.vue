<template>
  <section
    id="architecture"
    class="nuc-home-section nuc-home-pillars nuc-home-panel"
    aria-labelledby="nuc-home-pillars-title"
  >
    <div class="nuc-home-pillars-head">
      <div class="nuc-home-pillars-pitch">
        <p class="nuc-home-eyebrow">{{ copy.pillarsEyebrow }}</p>
        <h2 id="nuc-home-pillars-title" class="nuc-home-title">
          {{ copy.pillarsTitle }}
        </h2>
        <p class="nuc-home-support">{{ copy.pillarsSupport }}</p>
        <button
          type="button"
          class="nuc-home-next nuc-home-pillars-cta"
          @click="onCta"
        >
          <span>{{ copy.pillarsCta }}</span>
          <nui-icon icon="mdi:arrow-down" />
        </button>
      </div>

      <figure class="nuc-home-pillars-share">
        <div class="nuc-home-pillars-share-chart">
          <svg viewBox="0 0 100 100" role="img" :aria-label="shareLabel">
            <path
              v-for="arc in arcs"
              :key="arc.id"
              class="nuc-home-pillars-share-slice"
              :d="arc.d"
              :fill="arc.color"
              :stroke="arc.color"
            />
          </svg>
          <div class="nuc-home-pillars-share-hole">
            <strong>{{ stackCount }}</strong>
            <span>{{ copy.pillarsShareUnit }}</span>
          </div>
        </div>
        <figcaption class="nuc-home-pillars-share-legend">
          <ul>
            <li v-for="item in legend" :key="item.id">
              <i aria-hidden="true" :style="{ '--c1': item.color }" />
              <span>{{ item.label }}</span>
            </li>
          </ul>
          <p class="nuc-home-pillars-share-note">
            {{ copy.pillarsShareSource }}
          </p>
        </figcaption>
      </figure>
    </div>

    <div class="nuc-home-pillars-grid">
      <article
        v-for="pillar in pillars"
        :key="pillar.title"
        class="nuc-home-pillars-item"
      >
        <div class="nuc-home-pillars-item-top">
          <span class="nuc-home-pillars-icon" aria-hidden="true">
            <nui-icon :icon="pillar.icon" />
          </span>
          <span class="nuc-home-pillars-index">{{ pillar.index }}</span>
        </div>
        <h3 class="nuc-home-pillars-title">{{ pillar.title }}</h3>
        <p class="nuc-home-pillars-desc">{{ pillar.description }}</p>
        <div class="nuc-home-pillars-foot">
          <p class="nuc-home-pillars-outcome">{{ pillar.outcome }}</p>
          <p class="nuc-home-pillars-proof">{{ pillar.proof }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  NUC_HOME_COPY,
  NUC_HOME_PILLARS,
  NUC_HOME_WEB_SHARE,
  nucHomeWebShareArcs,
  nucHomeWebShareLegend,
} from '../../constants/content'
import { scrollHomeSection } from '../../utils/observe_active_section'

const copy = NUC_HOME_COPY
const pillars = NUC_HOME_PILLARS
const stackCount = NUC_HOME_WEB_SHARE.slices.length
const arcs = nucHomeWebShareArcs()
const legend = nucHomeWebShareLegend()
const shareLabel = `Nucleify emits to ${stackCount} core web stacks`

function onCta(): void {
  const root = document.querySelector<HTMLElement>('.nuc-home')
  if (!root) return
  scrollHomeSection(root, 'clone')
}
</script>

<style lang="scss" scoped>
@import 'index';
</style>
