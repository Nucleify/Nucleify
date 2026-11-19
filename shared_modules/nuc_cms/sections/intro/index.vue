<template>
  <section
    :id="domId"
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
        v-if="showAnyPanel"
        class="nuc-hero-panel is-deal"
        :class="panelClasses"
        :aria-label="copy.glanceAria"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
      >
        <div class="nuc-deal">
          <div class="nuc-deal-stage">
            <NucHomeHoloCube
              v-if="showAnyCube"
              :focus="focusId"
              :faces="faces"
              :paused="hovering"
              @focus="onFocus"
            />

            <div
              v-if="showAnyGlance"
              class="nuc-deal-readout"
              aria-live="polite"
            >
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
import { computed } from 'vue'

import {
  coalesceArray,
  coalesceStringFields,
  DEFAULT_SHOW_CUBE,
  DEFAULT_SHOW_GLANCE,
  homePlayHref,
  NUC_INVESTOR_GLANCE,
  scrollFrameTo,
  type NucHomeModuleLaneId,
  useBreakpointPanel,
  useCmsAttrs,
  useHoloCubeFocus,
  useInvestorCmsCopy,
  useSectionDomId,
} from '@shared_modules'
import NucHomeHoloCube from '@shared_modules/nuc_cms/parts/holo_cube/index.vue'

defineOptions({ inheritAttrs: false })

const cms = useCmsAttrs()
const domId = useSectionDomId('intro')
const copy = useInvestorCmsCopy()
const brandChars = computed(() => [...(copy.value.brand || 'Nucleify')])
const glance = computed(() =>
  coalesceStringFields(cms.glance, { ...NUC_INVESTOR_GLANCE })
)
const playHref = computed(() => copy.value.playgroundHref || homePlayHref())

const faces = coalesceArray(cms.cubeFaces, [
  { id: 'ui', label: 'Product' },
  { id: 'sdk', label: 'Nucleus' },
  { id: 'data', label: 'Capital' },
]) as { id: NucHomeModuleLaneId; label: string }[]

const { showAnyCube, showAnyGlance, showAnyPanel, panelClasses } =
  useBreakpointPanel(
    () => cms.showCube,
    () => cms.showGlance,
    DEFAULT_SHOW_CUBE,
    DEFAULT_SHOW_GLANCE
  )

const { focusId, hovering, onFocus } = useHoloCubeFocus({
  pauseOnFocus: false,
})

function onContact(): void {
  scrollFrameTo('ask')
}

function onThesis(): void {
  scrollFrameTo('thesis')
}
</script>

<style lang="scss" scoped>
@import 'index';
</style>
