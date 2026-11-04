<template>
  <section class="nuc-section nuc-thank-you nuc-panel" aria-label="Thank you">
    <div class="nuc-thank-you-inner">
      <div class="nuc-thank-you-layout">
        <aside class="nuc-thank-you-cube" aria-label="Nucleify nucleus">
          <NucHoloCube
            :focus="focusId"
            :faces="faceMeta"
            :paused="cubePaused"
            @focus="onCubeFocus"
          />
        </aside>

        <div class="nuc-thank-you-copy">
          <h1 class="nuc-thank-you-title" :aria-label="copy.title">
            {{ copy.title }}
          </h1>
          <p class="nuc-thank-you-support">{{ copy.support }}</p>

          <div class="nuc-thank-you-cta">
            <a :href="pageHref(lang, 'home')" class="nuc-btn is-primary">
              <nui-icon icon="mdi:arrow-left" class="nuc-btn-icon" mode="svg" />
              <span>{{ copy.ctaHome }}</span>
            </a>
            <a :href="pageHref(lang, 'investor')" class="nuc-btn is-outlined">
              <nui-icon
                icon="mdi:chart-timeline-variant"
                class="nuc-btn-icon"
                mode="svg"
              />
              <span>{{ copy.ctaInvest }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import { NucHoloCube, pageHref, pickCopy, useCmsAttrs } from '@web'
import type { NucHomeModuleLaneId } from '@web'

const cms = useCmsAttrs()

const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')

const copy = computed(() => {
  const source =
    cms && typeof cms === 'object' && 'value' in cms
      ? (cms as { value: Record<string, unknown> }).value
      : (cms as Record<string, unknown>)
  const picked = pickCopy(source, [
    'thankYouTitle',
    'thankYouSupport',
    'thankYouCta',
    'thankYouInvestCta',
    'coreLaneUi',
    'coreLaneSdk',
    'coreLaneData',
  ])
  const str = (key: keyof typeof picked, fallback: string) => {
    const v = picked[key]
    return typeof v === 'string' && v.trim() ? v : fallback
  }
  return {
    title: str('thankYouTitle', 'Thanks - we got it.'),
    support: str(
      'thankYouSupport',
      'We reply within 24h with a clear next step. Check spam if nothing lands.'
    ),
    ctaHome: str('thankYouCta', 'Back to Nucleify'),
    ctaInvest: str('thankYouInvestCta', 'Invest in us?'),
    laneUi: str('coreLaneUi', 'ui'),
    laneSdk: str('coreLaneSdk', 'sdk'),
    laneData: str('coreLaneData', 'data'),
  }
})

const FACE_ORDER: NucHomeModuleLaneId[] = ['ui', 'sdk', 'data']
const faceMeta = computed(() =>
  FACE_ORDER.map((id) => ({
    id,
    label:
      id === 'ui'
        ? copy.value.laneUi
        : id === 'sdk'
          ? copy.value.laneSdk
          : copy.value.laneData,
  }))
)

const focusId = ref<NucHomeModuleLaneId>('sdk')
const cubePaused = ref(false)
let focusTimer: number | undefined

function onCubeFocus(id: NucHomeModuleLaneId): void {
  focusId.value = id
  cubePaused.value = true
}

onMounted(() => {
  focusTimer = window.setInterval(() => {
    if (cubePaused.value) return
    const i = FACE_ORDER.indexOf(focusId.value)
    focusId.value = FACE_ORDER[(i + 1) % FACE_ORDER.length]!
  }, 4200)
})

onBeforeUnmount(() => {
  if (focusTimer) window.clearInterval(focusTimer)
})
</script>

<style lang="scss">
@import 'index';
</style>
