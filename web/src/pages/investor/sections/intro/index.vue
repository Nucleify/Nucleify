<template>
  <section
    id="intro"
    class="nuc-home-hero nuc-home-panel nuc-inv-hero"
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
          <button
            type="button"
            class="nuc-home-btn is-primary"
            @click="onPrimary"
          >
            <Icon name="mdi:email-outline" class="nuc-home-btn-icon" />
            <span>{{ copy.ctaPrimary }}</span>
          </button>
          <button
            type="button"
            class="nuc-home-btn is-outlined"
            @click="onSecondary"
          >
            <Icon name="mdi:rocket-launch-outline" class="nuc-home-btn-icon" />
            <span>{{ copy.ctaSecondary }}</span>
          </button>
          <button type="button" class="nuc-home-next" @click="onThesis">
            <span>{{ copy.ctaTertiary }}</span>
            <Icon name="mdi:arrow-down" class="nuc-home-next-icon" />
          </button>
        </div>
      </div>

      <aside
        class="nuc-home-hero-panel is-deal"
        aria-label="Investment thesis at a glance"
      >
        <div
          class="nuc-inv-glance"
          role="img"
          :aria-label="glanceLabel"
          :class="{ 'is-on': ready }"
        >
          <p class="nuc-inv-glance-eyebrow">{{ glance.eyebrow }}</p>

          <div class="nuc-inv-glance-ratio" aria-hidden="true">
            <div class="nuc-inv-glance-col">
              <span class="nuc-inv-glance-num">{{ glance.from }}</span>
              <span class="nuc-inv-glance-label">{{ glance.fromLabel }}</span>
            </div>
            <span class="nuc-inv-glance-arrow" />
            <div class="nuc-inv-glance-col is-accent">
              <span class="nuc-inv-glance-num">{{ glance.to }}</span>
              <span class="nuc-inv-glance-label">{{ glance.toLabel }}</span>
            </div>
          </div>

          <p class="nuc-inv-glance-figure">
            <span>{{ glance.figureLead }}</span>
            <span>{{ glance.figureTrail }}</span>
            <small>{{ glance.figureUnit }}</small>
          </p>

          <p class="nuc-inv-glance-line">{{ glance.line }}</p>
          <p class="nuc-inv-glance-stacks">{{ glance.stacks }}</p>
          <p class="nuc-inv-glance-note">{{ glance.note }}</p>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed, onMounted, ref } from 'vue'

import {
  investorHomeHref,
  NUC_INVESTOR_COPY,
  NUC_INVESTOR_GLANCE,
} from '../../constants/content'
import { isAutomatedAudit } from '../../../home/utils/is_automated_audit'
import { scrollHomeSection } from '../../../home/utils/observe_active_section'

const copy = NUC_INVESTOR_COPY
const glance = NUC_INVESTOR_GLANCE
const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')
const ready = ref(false)

const glanceLabel = [
  `${glance.eyebrow}.`,
  `${glance.from} ${glance.fromLabel} to ${glance.to} ${glance.toLabel}.`,
  `${glance.figure} ${glance.figureUnit}.`,
  glance.line,
  glance.stacks,
  glance.note,
].join(' ')

onMounted(() => {
  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    isAutomatedAudit()
  ) {
    ready.value = true
    return
  }
  requestAnimationFrame(() => {
    ready.value = true
  })
})

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
