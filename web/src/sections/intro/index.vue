<template>
  <section
    id="intro"
    class="nuc-hero nuc-panel is-intro"
    aria-labelledby="nuc-brand"
  >
    <div class="nuc-hero-layout">
      <div class="nuc-hero-copy">
        <p class="nuc-hero-eyebrow">
          <span class="nuc-hero-live" aria-hidden="true" />
          {{ copy.heroEyebrow }}
        </p>

        <div class="nuc-hero-mark">
          <h1 id="nuc-brand" class="nuc-hero-brand">
            <span
              v-for="(ch, i) in brandChars"
              :key="`${ch}-${i}`"
              class="nuc-hero-brand-ch"
              :class="{ 'is-last': i === brandChars.length - 1 }"
              >{{ ch }}</span
            >
          </h1>
        </div>

        <p class="nuc-hero-headline">{{ copy.headline }}</p>
        <p class="nuc-hero-support">{{ copy.support }}</p>

        <div class="nuc-hero-cta">
          <button type="button" class="nuc-btn is-primary" @click="onPrimary">
            <nui-icon
              icon="mdi:email-outline"
              class="nuc-btn-icon"
              mode="svg"
            />
            <span>{{ copy.ctaPrimary }}</span>
          </button>
          <button
            type="button"
            class="nuc-btn is-outlined"
            @click="onSecondary"
          >
            <nui-icon
              icon="mdi:rocket-launch-outline"
              class="nuc-btn-icon"
              mode="svg"
            />
            <span>{{ copy.ctaSecondary }}</span>
          </button>
          <button type="button" class="nuc-next" @click="onThesis">
            <span>{{ copy.ctaTertiary }}</span>
            <nui-icon icon="mdi:arrow-down" class="nuc-next-icon" mode="svg" />
          </button>
        </div>
      </div>

      <aside
        class="nuc-hero-panel is-deal"
        :aria-label="copy.glanceAria"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
      >
        <div class="nuc-deal">
          <div class="nuc-deal-stage">
            <NucHomeHoloCube
              :focus="focusId"
              :faces="faces"
              :paused="hovering"
              @focus="onCubeFocus"
            />

            <div class="nuc-deal-readout" aria-live="polite">
              <p class="nuc-deal-kicker">
                {{ glance.eyebrow }}
                <em>{{ activeFace.label }}</em>
              </p>
              <p class="nuc-deal-money">
                <span>{{ glance.figureLead }}{{ glance.figureTrail }}</span>
                <small>{{ glance.figureUnit }}</small>
              </p>
              <p class="nuc-deal-line">{{ glance.line }}</p>
              <p class="nuc-deal-note">{{ glance.note }}</p>
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
  NUC_INVESTOR_GLANCE,
  type NucHomeModuleLaneId,
  NucHoloCube as NucHomeHoloCube,
  scrollSection,
  useInvestorCmsCopy,
} from '@web'

defineOptions({ inheritAttrs: false })

const copy = useInvestorCmsCopy()
const brandChars = computed(() => [...(copy.value.brand || 'Nucleify')])
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

function onCubeFocus(id: NucHomeModuleLaneId): void {
  focusId.value = id
}

function onPrimary(): void {
  const root = document.querySelector<HTMLElement>('.nuc-shell')
  if (!root) return
  scrollSection(root, 'ask')
}

function onSecondary(): void {
  window.location.assign(investorHomeHref(lang.value))
}

function onThesis(): void {
  const root = document.querySelector<HTMLElement>('.nuc-shell')
  if (!root) return
  scrollSection(root, 'thesis')
}
</script>

<style lang="scss" scoped>
@import 'index';
</style>
