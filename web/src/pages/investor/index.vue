<script setup lang="ts">
import { useRoute, useSeoMeta } from 'nuxt/app'
import {
  computed,
  defineAsyncComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
} from 'vue'

import {
  NUC_INVESTOR_COPY,
  NUC_INVESTOR_SECTIONS,
  NUC_INVESTOR_SEO,
  type NucInvestorSectionId,
} from './constants/content'
import NucInvestorIntro from './sections/intro/index.vue'

const NucInvestorThesis = defineAsyncComponent(
  () => import('./sections/thesis/index.vue')
)
const NucInvestorSavings = defineAsyncComponent(
  () => import('./sections/savings/index.vue')
)
const NucInvestorWedge = defineAsyncComponent(
  () => import('./sections/wedge/index.vue')
)
const NucInvestorSurface = defineAsyncComponent(
  () => import('./sections/surface/index.vue')
)
const NucInvestorAsk = defineAsyncComponent(
  () => import('./sections/ask/index.vue')
)

import { isAutomatedAudit } from '../home/utils/is_automated_audit'

const copy = NUC_INVESTOR_COPY
const sections = NUC_INVESTOR_SECTIONS
const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')
const seoUrl = computed(() => `https://nucleify.io/${lang.value}/investor`)

useSeoMeta({
  title: NUC_INVESTOR_SEO.title,
  description: NUC_INVESTOR_SEO.description,
  ogTitle: NUC_INVESTOR_SEO.title,
  ogDescription: NUC_INVESTOR_SEO.description,
  ogType: 'website',
  ogUrl: seoUrl,
  ogImage: NUC_INVESTOR_SEO.ogImage,
  twitterCard: 'summary',
  twitterTitle: NUC_INVESTOR_SEO.title,
  twitterDescription: NUC_INVESTOR_SEO.description,
  twitterImage: NUC_INVESTOR_SEO.ogImage,
})

const rootEl = ref<HTMLElement | null>(null)
const activeSection = ref<NucInvestorSectionId>('intro')
const menuOpen = ref(false)

const firstSectionId = sections[0]!.id
const lastSectionId = sections[sections.length - 1]!.id

let stopAnimations: (() => void) | undefined
let stopObserver: (() => void) | undefined
let stopScrollLoop: (() => void) | undefined
let stopScrollGate: (() => void) | undefined

function goToSection(id: NucInvestorSectionId): void {
  if (!rootEl.value) return
  menuOpen.value = false
  void import('../home/utils/observe_active_section').then(
    ({ scrollHomeSection }) => {
      scrollHomeSection(rootEl.value!, id)
    }
  )
}

async function replayBoot(root: HTMLElement): Promise<void> {
  if (isAutomatedAudit()) return
  activeSection.value = firstSectionId
  stopAnimations?.()
  stopAnimations = undefined
  root.classList.remove('nuc-home-ready', 'nuc-home-booting')
  root.style.setProperty('--home-iris', '0%')
  const { playInvestorAnimations } = await import(
    './utils/play_investor_animations'
  )
  stopAnimations = await playInvestorAnimations(root)
  const scroller = root.querySelector<HTMLElement>('.nuc-home-scroller')
  if (scroller) scroller.scrollTop = 0
}

onMounted(() => {
  void nextTick().then(() => {
    if (!rootEl.value) return
    const root = rootEl.value

    if (isAutomatedAudit()) {
      root.style.setProperty('--home-iris', '165%')
      root.classList.remove('nuc-home-booting')
      root.classList.add('nuc-home-ready')
      void import('../home/utils/observe_active_section').then(
        ({ observeActiveSection }) => {
          stopObserver = observeActiveSection(
            root,
            sections.map((section) => section.id),
            (id) => {
              activeSection.value = id as NucInvestorSectionId
            }
          )
        }
      )
      return
    }

    void import('./utils/play_investor_animations').then(
      ({ playInvestorAnimations }) => {
        void playInvestorAnimations(root).then((stop) => {
          stopAnimations = stop
        })
      }
    )

    void import('../home/utils/observe_active_section').then(
      ({ observeActiveSection }) => {
        stopObserver = observeActiveSection(
          root,
          sections.map((section) => section.id),
          (id) => {
            activeSection.value = id as NucInvestorSectionId
          }
        )
      }
    )

    void import('../home/utils/bind_home_scroll_loop').then(
      ({ bindHomeScrollLoop }) => {
        stopScrollLoop = bindHomeScrollLoop(root, {
          firstSectionId,
          lastSectionId,
          onLoop: () => {
            if (!rootEl.value) return
            return replayBoot(rootEl.value)
          },
        })
      }
    )

    void import('../home/utils/bind_home_section_scroll_gate').then(
      ({ bindHomeSectionScrollGate }) => {
        stopScrollGate = bindHomeSectionScrollGate(root)
      }
    )
  })
})

onBeforeUnmount(() => {
  stopScrollGate?.()
  stopScrollLoop?.()
  stopObserver?.()
  stopAnimations?.()
})
</script>

<template>
  <div
    ref="rootEl"
    class="nuc-home nuc-investor"
    :class="{ 'nuc-home-menu-open': menuOpen }"
  >
    <div class="nuc-home-shear" aria-hidden="true">
      <div class="nuc-home-aura" />
      <div class="nuc-home-stars" />
      <div class="nuc-home-grid" />
    </div>

    <nav class="nuc-home-rail" :aria-label="copy.sectionsLabel">
      <ol class="nuc-home-rail-list">
        <li v-for="(section, index) in sections" :key="section.id">
          <button
            type="button"
            class="nuc-home-rail-item"
            :class="{ 'is-active': activeSection === section.id }"
            :aria-current="activeSection === section.id ? 'true' : undefined"
            :aria-label="section.label"
            @click="goToSection(section.id)"
          >
            <span class="nuc-home-rail-index">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <span class="nuc-home-rail-label">{{ section.label }}</span>
          </button>
        </li>
      </ol>
    </nav>

    <main class="nuc-home-inner">
      <div class="nuc-home-scroller">
        <NucInvestorIntro />
        <NucInvestorThesis />
        <NucInvestorSavings />
        <NucInvestorWedge />
        <NucInvestorSurface />
        <NucInvestorAsk />
      </div>
    </main>
  </div>
</template>

<style lang="scss">
@import 'index';
</style>
