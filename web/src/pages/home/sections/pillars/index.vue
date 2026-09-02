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
        <button type="button" class="nuc-home-pillars-cta" @click="onCta">
          <span>{{ copy.pillarsCta }}</span>
          <nui-icon icon="mdi:arrow-down" />
        </button>
      </div>

      <ol class="nuc-home-pillars-flow" aria-label="How Nucleify works">
        <li
          v-for="(step, index) in steps"
          :key="step.index"
          class="nuc-home-pillars-flow-item"
        >
          <span class="nuc-home-pillars-flow-index">{{ step.index }}</span>
          <div class="nuc-home-pillars-flow-copy">
            <strong>{{ step.label }}</strong>
            <span>{{ step.detail }}</span>
          </div>
          <span
            v-if="index < steps.length - 1"
            class="nuc-home-pillars-flow-join"
            aria-hidden="true"
          />
        </li>
      </ol>
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
        <p class="nuc-home-pillars-outcome">{{ pillar.outcome }}</p>
        <h3 class="nuc-home-pillars-title">{{ pillar.title }}</h3>
        <p class="nuc-home-pillars-desc">{{ pillar.description }}</p>
        <p class="nuc-home-pillars-proof">{{ pillar.proof }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  NUC_HOME_COPY,
  NUC_HOME_PILLAR_STEPS,
  NUC_HOME_PILLARS,
} from '../../constants/content'
import { scrollHomeSection } from '../../utils/observe_active_section'

const copy = NUC_HOME_COPY
const pillars = NUC_HOME_PILLARS
const steps = NUC_HOME_PILLAR_STEPS

function onCta(): void {
  const root = document.querySelector<HTMLElement>('.nuc-home')
  if (!root) return
  scrollHomeSection(root, 'pulse')
}
</script>

<style lang="scss" scoped>
@import 'index';
</style>
