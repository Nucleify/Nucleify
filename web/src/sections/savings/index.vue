<template>
  <section
    ref="rootEl"
    id="savings"
    class="nuc-section nuc-savings nuc-panel"
    aria-labelledby="nuc-savings-title"
  >
    <div class="nuc-savings-top">
      <header class="nuc-savings-head">
        <p class="nuc-eyebrow">{{ copy.savingsEyebrow }}</p>
        <h2 id="nuc-savings-title" class="nuc-title">
          {{ copy.savingsTitle }}
        </h2>
        <p class="nuc-support">{{ copy.savingsSupport }}</p>
        <button type="button" class="nuc-next nuc-savings-cta" @click="go">
          <span>{{ copy.savingsCta }}</span>
          <nui-icon icon="mdi:arrow-down" mode="svg" />
        </button>
      </header>

      <div class="nuc-savings-focus" :aria-label="copy.glanceAria">
        <div class="nuc-savings-glow" aria-hidden="true" />
        <p class="nuc-savings-kicker">{{ copy.pulseStatus }}</p>
        <p class="nuc-savings-ratio">
          <span>
            <strong>{{ glance.from }}</strong>
            <small>{{ glance.fromLabel }}</small>
          </span>
          <em aria-hidden="true">→</em>
          <span class="is-accent">
            <strong>{{ glance.to }}</strong>
            <small>{{ glance.toLabel }}</small>
          </span>
        </p>
        <p class="nuc-savings-money">
          <span>{{ dollars.value }}</span>
          <small>{{ dollars.unit }}</small>
        </p>
        <p class="nuc-savings-line">{{ glance.line }}</p>
      </div>
    </div>

    <ul class="nuc-savings-rail" aria-label="Planning metrics">
      <li v-for="item in rail" :key="item.id">
        <p class="nuc-savings-rail-value">{{ item.value }}</p>
        <p class="nuc-savings-rail-unit">{{ item.unit }}</p>
        <p class="nuc-savings-rail-label">{{ item.label }}</p>
        <p class="nuc-savings-rail-detail">{{ item.detail }}</p>
      </li>
    </ul>

    <p class="nuc-savings-note">{{ copy.savingsNote }}</p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useShellSectionReveal } from '@web'
import { savingsReveal } from './motion'

const rootEl = ref<HTMLElement | null>(null)
useShellSectionReveal(rootEl, savingsReveal)

import {
  NUC_INVESTOR_GLANCE,
  NUC_INVESTOR_SAVINGS,
  scrollSection,
  useInvestorCmsCopy,
} from '@web'

defineOptions({ inheritAttrs: false })

const copy = useInvestorCmsCopy()
const glance = NUC_INVESTOR_GLANCE
const dollars =
  NUC_INVESTOR_SAVINGS.find((item) => item.id === 'dollars') ??
  NUC_INVESTOR_SAVINGS[1]!
const rail = NUC_INVESTOR_SAVINGS.filter((item) => item.id !== 'dollars')

function go(): void {
  const root = document.querySelector<HTMLElement>('.nuc-shell')
  if (!root) return
  scrollSection(root, 'wedge')
}
</script>

<style lang="scss" scoped>
@import 'index';
</style>
