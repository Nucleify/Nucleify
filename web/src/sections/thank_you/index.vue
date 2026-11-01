<template>
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
        <button type="button" class="nuc-btn is-primary" @click="goHome">
          <nui-icon icon="mdi:arrow-left" class="nuc-btn-icon" mode="svg" />
          <span>{{ copy.ctaHome }}</span>
        </button>
        <button type="button" class="nuc-btn is-outlined" @click="goInvest">
          <nui-icon
            icon="mdi:chart-timeline-variant"
            class="nuc-btn-icon"
            mode="svg"
          />
          <span>{{ copy.ctaInvest }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo, useRoute } from 'nuxt/app'
import { computed, onBeforeUnmount, onMounted, ref, useAttrs } from 'vue'

import { pickCopy } from '@web'
import type { NucHomeModuleLaneId } from '@web'
import { NucHoloCube } from '@web'
import { pageHref } from '@web'

defineOptions({ inheritAttrs: false })

const attrs = useAttrs()
const cms = computed(() => attrs as Record<string, unknown>)

const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')

const copy = computed(() => {
  const picked = pickCopy(cms.value, [
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

function goHome(): void {
  void navigateTo(pageHref(lang.value, 'home'))
}

function goInvest(): void {
  void navigateTo(pageHref(lang.value, 'investor'))
}

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
