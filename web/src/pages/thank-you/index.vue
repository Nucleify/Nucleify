<template>
  <div
    ref="rootEl"
    class="nuc-home nuc-thank-you"
    :class="{ 'nuc-home-booting': booting }"
  >
    <div class="nuc-home-shear" aria-hidden="true">
      <div class="nuc-home-aura" />
      <div class="nuc-home-stars" />
      <div class="nuc-home-grid" />
    </div>

    <main class="nuc-home-inner nuc-thank-you-inner">
      <div class="nuc-thank-you-layout">
        <aside class="nuc-thank-you-cube" aria-label="Nucleify nucleus">
          <NucHomeHoloCube
            :focus="focusId"
            :faces="faceMeta"
            :paused="cubePaused"
            @focus="onCubeFocus"
          />
        </aside>

        <div class="nuc-thank-you-copy">
          <h1 class="nuc-thank-you-title" :aria-label="copy.thankYouTitle">
            {{ copy.thankYouTitle }}
          </h1>
          <p class="nuc-thank-you-support">{{ copy.thankYouSupport }}</p>

          <div class="nuc-thank-you-cta">
            <button
              type="button"
              class="nuc-home-btn is-primary"
              @click="goHome"
            >
              <nui-icon
                icon="mdi:arrow-left"
                class="nuc-home-btn-icon"
                mode="svg"
              />
              <span>{{ copy.thankYouCta }}</span>
            </button>
            <button
              type="button"
              class="nuc-home-btn is-outlined"
              @click="goInvest"
            >
              <nui-icon
                icon="mdi:chart-timeline-variant"
                class="nuc-home-btn-icon"
                mode="svg"
              />
              <span>{{ copy.thankYouInvestCta }}</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { navigateTo, useRoute, useSeoMeta } from 'nuxt/app'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

import {
  homeHref,
  homeInvestorHref,
  NUC_HOME_COPY,
  NUC_HOME_SEO,
  type NucHomeModuleLaneId,
} from '../home/constants/content'
import NucHomeHoloCube from '../home/sections/core/holo_cube.vue'
import { isAutomatedAudit } from '../home/utils/is_automated_audit'

const copy = NUC_HOME_COPY
const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')
const seoUrl = computed(() => `https://nucleify.io/${lang.value}/thank-you`)

const FACE_ORDER: NucHomeModuleLaneId[] = ['ui', 'sdk', 'data']
const faceMeta = FACE_ORDER.map((id) => ({
  id,
  label:
    id === 'ui'
      ? copy.coreLaneUi
      : id === 'sdk'
        ? copy.coreLaneSdk
        : copy.coreLaneData,
}))

const rootEl = ref<HTMLElement | null>(null)
const booting = ref(true)
const focusId = ref<NucHomeModuleLaneId>('sdk')
const cubePaused = ref(false)
const motionGate = { generation: 0 }
let stopAnimations: (() => void) | undefined
let focusTimer: number | undefined

useSeoMeta({
  title: copy.thankYouSeoTitle,
  description: copy.thankYouSeoDescription,
  ogTitle: copy.thankYouSeoTitle,
  ogDescription: copy.thankYouSeoDescription,
  ogType: 'website',
  ogUrl: seoUrl,
  ogImage: NUC_HOME_SEO.ogImage,
  robots: 'noindex, follow',
})

function goHome(): void {
  void navigateTo(homeHref(lang.value))
}

function goInvest(): void {
  void navigateTo(homeInvestorHref(lang.value))
}

function onCubeFocus(id: NucHomeModuleLaneId): void {
  focusId.value = id
  cubePaused.value = true
}

onMounted(() => {
  const generation = ++motionGate.generation
  void nextTick().then(() => {
    if (generation !== motionGate.generation || !rootEl.value) return
    const root = rootEl.value

    if (isAutomatedAudit()) {
      root.style.setProperty('--home-iris', '165%')
      root.classList.remove('nuc-home-booting')
      root.classList.add('nuc-home-ready', 'nuc-home-static')
      booting.value = false
      return
    }

    void import('./utils/play_thank_you_animations')
      .then(({ playThankYouAnimations }) => {
        if (generation !== motionGate.generation) return
        void playThankYouAnimations(root)
          .then((stop) => {
            if (generation !== motionGate.generation) {
              stop?.()
              return
            }
            stopAnimations = stop
            booting.value = false
          })
          .catch(() => {
            if (generation !== motionGate.generation) return
            root.style.setProperty('--home-iris', '165%')
            root.classList.remove('nuc-home-booting')
            root.classList.add('nuc-home-ready')
            booting.value = false
          })
      })
      .catch(() => {
        if (generation !== motionGate.generation) return
        root.style.setProperty('--home-iris', '165%')
        root.classList.remove('nuc-home-booting')
        root.classList.add('nuc-home-ready')
        booting.value = false
      })

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      focusTimer = window.setInterval(() => {
        if (cubePaused.value) return
        const idx = FACE_ORDER.indexOf(focusId.value)
        focusId.value = FACE_ORDER[(idx + 1) % FACE_ORDER.length]!
      }, 4200)
    }
  })
})

onBeforeUnmount(() => {
  motionGate.generation += 1
  if (focusTimer) window.clearInterval(focusTimer)
  stopAnimations?.()
})
</script>

<style lang="scss">
@import '../home/index';
@import 'index';
</style>
