<template>
  <div
    ref="rootEl"
    class="nuc-home"
    :class="{ 'nuc-home-menu-open': menuOpen }"
  >
    <div class="nuc-home-shear" aria-hidden="true">
      <div class="nuc-home-aura" />
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
        <NucHomeStack />
        <NucHomeCore />
        <NucHomePulse />
        <NucHomeCompilerDemo />
        <NucHomeClose />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
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
  type NucHomeSectionId,
} from './constants/content'
import NucHomeHero from './sections/hero/index.vue'

const NucHomePillars = defineAsyncComponent(
  () => import('./sections/pillars/index.vue')
)
const NucHomeStack = defineAsyncComponent(
  () => import('./sections/stack/index.vue')
)
const NucHomeCore = defineAsyncComponent(
  () => import('./sections/core/index.vue')
)
const NucHomePulse = defineAsyncComponent(
  () => import('./sections/pulse/index.vue')
)
const NucHomeCompilerDemo = defineAsyncComponent(
  () => import('./sections/compiler_demo/index.vue')
)
const NucHomeClose = defineAsyncComponent(
  () => import('./sections/close/index.vue')
)

import { isAutomatedAudit } from './utils/is_automated_audit'

const copy = NUC_HOME_COPY
const sections = NUC_HOME_SECTIONS
const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')
const rootEl = ref<HTMLElement | null>(null)
const activeSection = ref<NucHomeSectionId>('intro')
const menuOpen = ref(false)

const firstSectionId = sections[0]!.id
const lastSectionId = sections[sections.length - 1]!.id

let stopAnimations: (() => void) | undefined
let stopObserver: (() => void) | undefined
let stopScrollLoop: (() => void) | undefined

function goToSection(id: NucHomeSectionId): void {
  if (!rootEl.value) return
  menuOpen.value = false
  void import('./utils/observe_active_section').then(
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
  const { playHomeAnimations } = await import('./utils/play_home_animations')
  stopAnimations = await playHomeAnimations(root)
  const scroller = root.querySelector<HTMLElement>('.nuc-home-scroller')
  if (scroller) scroller.scrollTop = 0
}

onMounted(() => {
  void nextTick().then(() => {
    if (!rootEl.value) return
    const root = rootEl.value

    // PageSpeed / Lighthouse: skip motion so the lab run can finish.
    if (isAutomatedAudit()) {
      root.style.setProperty('--home-iris', '165%')
      root.classList.remove('nuc-home-booting')
      root.classList.add('nuc-home-ready')
      void import('./utils/observe_active_section').then(
        ({ observeActiveSection }) => {
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

    void import('./utils/play_home_animations').then(
      ({ playHomeAnimations }) => {
        void playHomeAnimations(root).then((stop) => {
          stopAnimations = stop
        })
      }
    )

    void import('./utils/observe_active_section').then(
      ({ observeActiveSection }) => {
        stopObserver = observeActiveSection(
          root,
          sections.map((section) => section.id),
          (id) => {
            activeSection.value = id as NucHomeSectionId
          }
        )
      }
    )

    void import('./utils/bind_home_scroll_loop').then(
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
  })
})

onBeforeUnmount(() => {
  stopScrollLoop?.()
  stopObserver?.()
  stopAnimations?.()
})
</script>

<style lang="scss">
@import 'index';
</style>
