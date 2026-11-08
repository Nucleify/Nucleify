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
          <a
            class="nuc-btn is-primary"
            :href="playHref"
            target="_blank"
            rel="noopener noreferrer"
          >
            <nui-icon
              icon="mdi:play-circle-outline"
              class="nuc-btn-icon"
              mode="svg"
            />
            <span>{{ copy.ctaPrimary }}</span>
          </a>
          <button type="button" class="nuc-btn is-outlined" @click="onContact">
            <nui-icon
              icon="mdi:email-outline"
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
              <p class="nuc-deal-money">
                <span class="nuc-deal-figure">
                  <span>{{ glance.figureLead }}</span>
                  <em aria-hidden="true">→</em>
                  <span class="nuc-deal-figure-to"
                    >{{ glance.figureTrail }}</span
                  >
                </span>
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
import { computed, ref } from 'vue'

import {
  coalesceArray,
  coalesceString,
  homePlayHref,
  isPlainObject,
  NUC_INVESTOR_GLANCE,
  type NucHomeModuleLaneId,
  NucHoloCube as NucHomeHoloCube,
  scrollSection,
  useCmsAttrs,
  useInvestorCmsCopy,
} from '@web'

defineOptions({ inheritAttrs: false })

const cms = useCmsAttrs()
const copy = useInvestorCmsCopy()
const brandChars = computed(() => [...(copy.value.brand || 'Nucleify')])
const glance = computed(() => {
  const raw = cms.glance
  if (!isPlainObject(raw)) return { ...NUC_INVESTOR_GLANCE }
  return {
    eyebrow: coalesceString(raw.eyebrow, NUC_INVESTOR_GLANCE.eyebrow),
    from: coalesceString(raw.from, NUC_INVESTOR_GLANCE.from),
    to: coalesceString(raw.to, NUC_INVESTOR_GLANCE.to),
    fromLabel: coalesceString(raw.fromLabel, NUC_INVESTOR_GLANCE.fromLabel),
    toLabel: coalesceString(raw.toLabel, NUC_INVESTOR_GLANCE.toLabel),
    figure: coalesceString(raw.figure, NUC_INVESTOR_GLANCE.figure),
    figureLead: coalesceString(raw.figureLead, NUC_INVESTOR_GLANCE.figureLead),
    figureTrail: coalesceString(
      raw.figureTrail,
      NUC_INVESTOR_GLANCE.figureTrail
    ),
    figureUnit: coalesceString(raw.figureUnit, NUC_INVESTOR_GLANCE.figureUnit),
    line: coalesceString(raw.line, NUC_INVESTOR_GLANCE.line),
    note: coalesceString(raw.note, NUC_INVESTOR_GLANCE.note),
  }
})
const playHref = computed(() => copy.value.playgroundHref || homePlayHref())

const faces = coalesceArray(cms.cubeFaces, [
  { id: 'ui', label: 'Product' },
  { id: 'sdk', label: 'Nucleus' },
  { id: 'data', label: 'Capital' },
]) as { id: NucHomeModuleLaneId; label: string }[]

const focusId = ref<NucHomeModuleLaneId>('sdk')
const hovering = ref(false)

function onCubeFocus(id: NucHomeModuleLaneId): void {
  focusId.value = id
}

function onContact(): void {
  const root = document.querySelector<HTMLElement>('.nuc-shell')
  if (!root) return
  scrollSection(root, 'ask')
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
