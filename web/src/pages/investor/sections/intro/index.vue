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

        <p class="nuc-home-hero-headline">{{ copy.headline }}</p>
        <p class="nuc-home-hero-support">{{ copy.support }}</p>

        <div class="nuc-home-hero-cta">
          <button
            type="button"
            class="nuc-home-btn is-primary"
            @click="onPrimary"
          >
            <nui-icon
              icon="mdi:email-outline"
              class="nuc-home-btn-icon"
              mode="svg"
            />
            <span>{{ copy.ctaPrimary }}</span>
          </button>
          <button
            type="button"
            class="nuc-home-btn is-outlined"
            @click="onSecondary"
          >
            <nui-icon
              icon="mdi:rocket-launch-outline"
              class="nuc-home-btn-icon"
              mode="svg"
            />
            <span>{{ copy.ctaSecondary }}</span>
          </button>
          <button type="button" class="nuc-home-next" @click="onThesis">
            <span>{{ copy.ctaTertiary }}</span>
            <nui-icon
              icon="mdi:arrow-down"
              class="nuc-home-next-icon"
              mode="svg"
            />
          </button>
        </div>
      </div>

      <aside
        class="nuc-home-hero-panel is-deal"
        :aria-label="copy.glanceAria"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
      >
        <div class="nuc-inv-deal">
          <div class="nuc-inv-deal-stage">
            <NucHomeHoloCube
              :focus="focusId"
              :faces="faces"
              :paused="hovering"
              @focus="focusId = $event"
            />

            <div class="nuc-inv-deal-readout" aria-live="polite">
              <p class="nuc-inv-deal-kicker">
                {{ glance.eyebrow }}
                <em>{{ activeFace.label }}</em>
              </p>
              <p class="nuc-inv-deal-money">
                <span>{{ glance.figureLead }}{{ glance.figureTrail }}</span>
                <small>{{ glance.figureUnit }}</small>
              </p>
              <p class="nuc-inv-deal-line">{{ glance.line }}</p>
              <p class="nuc-inv-deal-note">{{ glance.note }}</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed, ref } from 'vue'

import {
  investorHomeHref,
  NUC_INVESTOR_COPY,
  NUC_INVESTOR_GLANCE,
} from '../../constants/content'
import type { NucHomeModuleLaneId } from '../../../home/constants/content'
import { scrollHomeSection } from '../../../home/utils/observe_active_section'
import NucHomeHoloCube from '../../../home/sections/core/holo_cube.vue'

const copy = NUC_INVESTOR_COPY
const glance = NUC_INVESTOR_GLANCE
const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')

const faces = [
  { id: 'ui' as const, label: 'Product' },
  { id: 'sdk' as const, label: 'Nucleus' },
  { id: 'data' as const, label: 'Capital' },
]

const focusId = ref<NucHomeModuleLaneId>('sdk')
const hovering = ref(false)

const activeFace = computed(
  () => faces.find((face) => face.id === focusId.value) ?? faces[1]!
)

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
