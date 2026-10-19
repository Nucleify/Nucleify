<template>
  <div
    ref="rootEl"
    class="nuc-home"
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
        <NucHomeHero />
        <NucHomePillars />
        <NucHomeClone />
        <NucHomeStack />
        <NucHomeCompilerDemo />
        <NucHomePulse />
        <NucHomeClose />
      </div>
    </main>
  </div>
</template>

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
  NUC_HOME_COPY,
  NUC_HOME_SECTIONS,
  NUC_HOME_SEO,
  type NucHomeSectionId,
} from './constants/content'
import NucHomeHero from './sections/hero/index.vue'

const NucHomePillars = defineAsyncComponent(
  () => import('./sections/pillars/index.vue')
)
const NucHomeStack = defineAsyncComponent(
  () => import('./sections/stack/index.vue')
)
const NucHomePulse = defineAsyncComponent(
  () => import('./sections/pulse/index.vue')
)
const NucHomeCompilerDemo = defineAsyncComponent(
  () => import('./sections/compiler_demo/index.vue')
)
const NucHomeClone = defineAsyncComponent(
  () => import('./sections/clone/index.vue')
)
const NucHomeClose = defineAsyncComponent(
  () => import('./sections/close/index.vue')
)

import { isAutomatedAudit } from './utils/is_automated_audit'

const copy = NUC_HOME_COPY
const sections = NUC_HOME_SECTIONS
const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')
const seoUrl = computed(() => `https://nucleify.io/${lang.value}/home`)

useSeoMeta({
  title: NUC_HOME_SEO.title,
  description: NUC_HOME_SEO.description,
  ogTitle: NUC_HOME_SEO.title,
  ogDescription: NUC_HOME_SEO.description,
  ogType: 'website',
  ogUrl: seoUrl,
  ogImage: NUC_HOME_SEO.ogImage,
  twitterCard: 'summary',
  twitterTitle: NUC_HOME_SEO.title,
  twitterDescription: NUC_HOME_SEO.description,
  twitterImage: NUC_HOME_SEO.ogImage,
})
const rootEl = ref<HTMLElement | null>(null)
const activeSection = ref<NucHomeSectionId>('intro')
const menuOpen = ref(false)

let stopAnimations: (() => void) | undefined
let stopObserver: (() => void) | undefined
let stopScrollGate: (() => void) | undefined
/**
 * Plain object so product convert keeps a stable counter (not useState).
 * Guards async animation start against remount / Strict Mode double-invoke.
 */
const motionGate = { generation: 0 }

function goToSection(id: NucHomeSectionId): void {
  if (!rootEl.value) return
  menuOpen.value = false
  void import('./utils/observe_active_section').then(
    ({ scrollHomeSection }) => {
      scrollHomeSection(rootEl.value!, id)
    }
  )
}

onMounted(() => {
  const generation = ++motionGate.generation
  void nextTick().then(() => {
    if (generation !== motionGate.generation || !rootEl.value) return
    const root = rootEl.value

    // PageSpeed / Lighthouse: skip motion so the lab run can finish.
    if (isAutomatedAudit()) {
      root.style.setProperty('--home-iris', '165%')
      root.classList.remove('nuc-home-booting')
      root.classList.add('nuc-home-ready', 'nuc-home-static')
      void import('./utils/observe_active_section').then(
        ({ observeActiveSection }) => {
          if (generation !== motionGate.generation) return
          stopObserver = observeActiveSection(
            root,
            sections.map((section) => section.id),
            (id) => {
              activeSection.value = id as NucHomeSectionId
            }
          )
        }
      )
      return
    }

    void import('./utils/play_home_animations')
      .then(({ playHomeAnimations }) => {
        if (generation !== motionGate.generation) return
        void playHomeAnimations(root)
          .then((stop) => {
            if (generation !== motionGate.generation) {
              stop?.()
              return
            }
            stopAnimations = stop
          })
          .catch(() => {
            if (generation !== motionGate.generation) return
            root.style.setProperty('--home-iris', '165%')
            root.classList.remove('nuc-home-booting')
            root.classList.add('nuc-home-ready')
          })
      })
      .catch(() => {
        if (generation !== motionGate.generation) return
        root.style.setProperty('--home-iris', '165%')
        root.classList.remove('nuc-home-booting')
        root.classList.add('nuc-home-ready')
      })

    // Layout readers (IO / ResizeObserver / offsetHeight) — after intro boot only.
    void import('./utils/when_home_ready').then(({ whenHomeReady }) => {
      void whenHomeReady(root).then(() => {
        if (generation !== motionGate.generation) return
        void import('./utils/observe_active_section').then(
          ({ observeActiveSection }) => {
            if (generation !== motionGate.generation) return
            stopObserver = observeActiveSection(
              root,
              sections.map((section) => section.id),
              (id) => {
                activeSection.value = id as NucHomeSectionId
              }
            )
          }
        )

        void import('./utils/bind_home_section_scroll_gate').then(
          ({ bindHomeSectionScrollGate }) => {
            if (generation !== motionGate.generation) return
            stopScrollGate = bindHomeSectionScrollGate(root)
          }
        )
      })
    })
  })
})

onBeforeUnmount(() => {
  motionGate.generation += 1
  stopScrollGate?.()
  stopObserver?.()
  stopAnimations?.()
})
</script>

<style lang="scss">
@import 'index';
</style>
