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

    <div class="nuc-home-inner">
      <div class="nuc-home-scroller">
        <NucHomeHero />
        <NucHomePillars />
        <NucHomeStack />
        <NucHomeCore />
        <NucHomePulse />
        <NucHomeClose />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'

import {
  NUC_HOME_COPY,
  NUC_HOME_SECTIONS,
  type NucHomeSectionId,
} from './constants/content'
import NucHomeClose from './sections/close/index.vue'
import NucHomeCore from './sections/core/index.vue'
import NucHomeHero from './sections/hero/index.vue'
import NucHomePillars from './sections/pillars/index.vue'
import NucHomePulse from './sections/pulse/index.vue'
import NucHomeStack from './sections/stack/index.vue'
import { bindHomeScrollLoop } from './utils/bind_home_scroll_loop'
import {
  observeActiveSection,
  scrollHomeSection,
} from './utils/observe_active_section'
import { playHomeAnimations } from './utils/play_home_animations'

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
  scrollHomeSection(rootEl.value, id)
}

async function replayBoot(root: HTMLElement): Promise<void> {
  activeSection.value = firstSectionId
  stopAnimations?.()
  stopAnimations = undefined
  // Scroll already jumped in bindHomeScrollLoop; keep iris reset for boot.
  root.classList.remove('nuc-home-ready', 'nuc-home-booting')
  root.style.setProperty('--home-iris', '0%')
  stopAnimations = await playHomeAnimations(root)
}

onMounted(async () => {
  await nextTick()
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve())
  })
  if (!rootEl.value) return

  stopObserver = observeActiveSection(
    rootEl.value,
    sections.map((section) => section.id),
    (id) => {
      activeSection.value = id as NucHomeSectionId
    }
  )
  stopAnimations = await playHomeAnimations(rootEl.value)
  stopScrollLoop = bindHomeScrollLoop(rootEl.value, {
    firstSectionId,
    lastSectionId,
    onLoop: () => {
      if (!rootEl.value) return
      return replayBoot(rootEl.value)
    },
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
