<template>
  <section
    id="intro"
    class="nuc-home-hero nuc-home-panel"
    aria-labelledby="nuc-investor-brand"
  >
    <div class="nuc-home-hero-layout">
      <div class="nuc-home-hero-copy">
        <p class="nuc-home-hero-eyebrow">
          <span class="nuc-home-hero-live" aria-hidden="true" />
          {{ copy.heroEyebrow }}
        </p>

        <div class="nuc-home-hero-mark">
          <h1 id="nuc-investor-brand" class="nuc-home-hero-brand">
            {{ copy.brand }}
          </h1>
        </div>

        <p class="nuc-home-hero-headline">
          {{ copy.headline }}
        </p>

        <p class="nuc-home-hero-support">
          {{ copy.support }}
        </p>

        <div class="nuc-home-hero-cta">
          <nui-button
            :label="copy.ctaPrimary"
            variant="primary"
            icon="mdi:email-outline"
            icon-pos="right"
            @click="onPrimary"
          />
          <nui-button
            :label="copy.ctaSecondary"
            variant="outlined"
            icon="mdi:rocket-launch-outline"
            @click="onSecondary"
          />
          <button type="button" class="nuc-home-next" @click="onThesis">
            <span>{{ copy.ctaTertiary }}</span>
            <nui-icon icon="mdi:arrow-down" />
          </button>
        </div>

        <ul class="nuc-home-hero-proof" aria-label="Highlights">
          <li v-for="item in proof" :key="item">{{ item }}</li>
        </ul>
      </div>

      <aside
        class="nuc-home-hero-panel is-metrics"
        aria-label="Modeled savings preview"
      >
        <div class="nuc-investor-metrics">
          <p class="nuc-investor-metrics-kicker">Modeled / year</p>
          <p class="nuc-investor-metrics-value">$180k–$320k</p>
          <p class="nuc-investor-metrics-unit">
            dual-shell rewrite tax avoided
          </p>
          <div class="nuc-investor-metrics-rings" aria-hidden="true">
            <span class="nuc-investor-metrics-ring" />
            <span class="nuc-investor-metrics-ring" />
            <span class="nuc-investor-metrics-ring" />
            <span class="nuc-investor-metrics-core" />
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed } from 'vue'

import {
  investorHomeHref,
  NUC_INVESTOR_COPY,
  NUC_INVESTOR_PROOF,
} from '../../constants/content'
import { scrollHomeSection } from '../../../home/utils/observe_active_section'

const copy = NUC_INVESTOR_COPY
const proof = NUC_INVESTOR_PROOF
const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')

function onPrimary(): void {
  const root = document.querySelector<HTMLElement>('.nuc-investor')
  if (!root) return
  scrollHomeSection(root, 'ask')
}

function onSecondary(): void {
  window.location.assign(investorHomeHref(lang.value))
}

function onThesis(): void {
  const root = document.querySelector<HTMLElement>('.nuc-investor')
  if (!root) return
  scrollHomeSection(root, 'thesis')
}
</script>
