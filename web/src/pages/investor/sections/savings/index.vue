<template>
  <section
    id="savings"
    class="nuc-home-section nuc-inv-keep nuc-home-panel"
    aria-labelledby="nuc-investor-savings-title"
  >
    <div class="nuc-inv-keep-top">
      <header class="nuc-inv-keep-head">
        <p class="nuc-home-eyebrow">{{ copy.savingsEyebrow }}</p>
        <h2 id="nuc-investor-savings-title" class="nuc-home-title">
          {{ copy.savingsTitle }}
        </h2>
        <p class="nuc-home-support">{{ copy.savingsSupport }}</p>
        <button
          type="button"
          class="nuc-home-next nuc-inv-keep-cta"
          @click="go"
        >
          <span>{{ copy.savingsCta }}</span>
          <nui-icon icon="mdi:arrow-down" mode="svg" />
        </button>
      </header>

      <div class="nuc-inv-keep-focus" :aria-label="copy.glanceAria">
        <div class="nuc-inv-keep-glow" aria-hidden="true" />
        <p class="nuc-inv-keep-kicker">{{ copy.pulseStatus }}</p>
        <p class="nuc-inv-keep-ratio">
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
        <p class="nuc-inv-keep-money">
          <span>{{ dollars.value }}</span>
          <small>{{ dollars.unit }}</small>
        </p>
        <p class="nuc-inv-keep-line">{{ glance.line }}</p>
      </div>
    </div>

    <ul class="nuc-inv-keep-rail" aria-label="Planning metrics">
      <li v-for="item in rail" :key="item.id">
        <p class="nuc-inv-keep-rail-value">{{ item.value }}</p>
        <p class="nuc-inv-keep-rail-unit">{{ item.unit }}</p>
        <p class="nuc-inv-keep-rail-label">{{ item.label }}</p>
        <p class="nuc-inv-keep-rail-detail">{{ item.detail }}</p>
      </li>
    </ul>

    <p class="nuc-inv-keep-note">{{ copy.savingsNote }}</p>
  </section>
</template>

<script setup lang="ts">
import {
  NUC_INVESTOR_COPY,
  NUC_INVESTOR_GLANCE,
  NUC_INVESTOR_SAVINGS,
} from '../../constants/content'
import { scrollHomeSection } from '../../../home/utils/observe_active_section'

const copy = NUC_INVESTOR_COPY
const glance = NUC_INVESTOR_GLANCE
const dollars =
  NUC_INVESTOR_SAVINGS.find((item) => item.id === 'dollars') ??
  NUC_INVESTOR_SAVINGS[1]!
const rail = NUC_INVESTOR_SAVINGS.filter((item) => item.id !== 'dollars')

function go(): void {
  const root = document.querySelector<HTMLElement>('.nuc-investor')
  if (!root) return
  scrollHomeSection(root, 'wedge')
}
</script>
