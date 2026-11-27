<template>
  <div
    ref="rootEl"
    class="nuc-frame"
    :class="{
      'nuc-menu-open': menuOpen,
      'is-pitch': isPitch,
      'is-thank-you': isThankYou,
      'nuc-no-iris': !isIrisEnabled || !hasFrameEffects,
      'nuc-frame--bare': !hasFrameEffects,
    }"
  >
    <component
      :is="pageTemplate.Shear"
      v-if="hasFrameEffects && showShear && pageTemplate.Shear"
    />
    <CmsMenuNav v-if="showMenu" />
    <component
      :is="pageTemplate.Rail"
      v-if="hasFrameEffects && showRail && railSections.length && pageTemplate.Rail"
      :sections="railSections"
      :active-section="activeSection"
      :aria-label="frame.railAriaLabel"
      @select="goToSection"
    />

    <main class="nuc-inner">
      <div class="nuc-scroller">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import CmsMenuNav from '../components/cms_menu_nav.vue'
import { usePublicFramePage } from '../composables/use_public_frame_page'
import {
  resolveFrameVariant,
  useFramePage,
} from '../composables/use_frame_page'
import {
  orderedKnownSections,
  railItemsFromSections,
} from '../cms/section_runtime'
import { resolvePageTemplate } from '../cms/page_templates'
import { isAutomatedAudit } from '../utils/is_lab'
import {
  settleSlidePanel,
  settleVisibleShellPanels,
} from '../utils/frame_motion'
import { playSlideEntrance } from '../utils/frame_section_reveal'
import {
  freezeScrollerForReorder,
  scrollToSlideIndex,
  unfreezeScroller,
} from '../utils/frame_scroll'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))
const isPreviewRoute = computed(() =>
  String(route.path || '').includes('/preview/')
)
const frame = useFramePage()

// Preview pages hydrate the shell from a draft token — skip the published
// fetch so we don't redirect drafts / overwrite preview sections.
if (!isPreviewRoute.value) {
  // Layout renders before the page Suspense resolves — await the same shell
  // payload here so rail/shear are not SSR'd as empty comments.
  await usePublicFramePage(slug)
} else {
  frame.value = {
    ...frame.value,
    sections: [],
    pending: true,
  }
}

const layoutSections = computed(() =>
  orderedKnownSections(frame.value.sections)
)
const railSections = computed(() => railItemsFromSections(layoutSections.value))
const pageTemplate = computed(() => resolvePageTemplate(frame.value.template))
const frameVariant = computed(() =>
  resolveFrameVariant(layoutSections.value, frame.value.variant)
)
const isPitch = computed(() => frameVariant.value === 'pitch')
const isThankYou = computed(() => frameVariant.value === 'thankYou')
const isIrisEnabled = computed(() => frame.value.enableIris !== false)
const showMenu = computed(() => frame.value.showMenu === true)
const showRail = computed(() => frame.value.showRail !== false)
const showShear = computed(() => frame.value.showShear !== false)
/** Shell motion when page template allows chrome and any chrome / iris is active. */
const hasFrameEffects = computed(() => {
  if (!pageTemplate.value.frameEffects) return false
  return showRail.value || showShear.value || isIrisEnabled.value
})

const rootEl = ref<HTMLElement | null>(null)
const activeSection = ref(railSections.value[0]?.id ?? '')
const menuOpen = ref(false)

let stopAnimations: (() => void) | undefined
let stopObserver: (() => void) | undefined
let stopScrollGate: (() => void) | undefined
const motionGate = { generation: 0 }

function goToSection(id: string): void {
  if (!rootEl.value) return
  menuOpen.value = false
  void import('../utils/frame_scroll').then(({ scrollSection }) => {
    scrollSection(rootEl.value!, id)
  })
}

function syncFrameModifiers(root: HTMLElement): void {
  root.classList.toggle('is-pitch', isPitch.value)
  root.classList.toggle('is-thank-you', isThankYou.value)
}

function markReady(root: HTMLElement): void {
  root.style.setProperty('--frame-iris', '165%')
  root.classList.remove('nuc-booting', 'nuc-iris-live')
  root.classList.add('nuc-ready')
  syncFrameModifiers(root)
}

function stopMotion(): void {
  stopScrollGate?.()
  stopScrollGate = undefined
  stopObserver?.()
  stopObserver = undefined
  stopAnimations?.()
  stopAnimations = undefined
}

/** Re-attach rail intersection observer after soft add/remove/reorder. */
function rebindSectionObserver(initialId?: string | null): void {
  if (!rootEl.value) return
  const root = rootEl.value
  const sectionIds = railSections.value.map((section) => section.id)
  stopObserver?.()
  stopObserver = undefined
  stopScrollGate?.()
  stopScrollGate = undefined
  if (!sectionIds.length) return
  const preferred =
    initialId && sectionIds.includes(initialId)
      ? initialId
      : activeSection.value && sectionIds.includes(activeSection.value)
        ? activeSection.value
        : sectionIds[sectionIds.length - 1]
  void import('../utils/frame_scroll').then(async (scroll) => {
    if (!rootEl.value || rootEl.value !== root) return
    // Wait until panels expose data-section-id (async section stamp).
    for (let i = 0; i < 12; i++) {
      const found = sectionIds.filter((id) => scroll.findSectionEl(root, id))
      if (found.length >= sectionIds.length) break
      await new Promise<void>((r) => requestAnimationFrame(() => r()))
      if (!rootEl.value || rootEl.value !== root) return
    }
    if (!rootEl.value || rootEl.value !== root) return
    stopObserver?.()
    stopObserver = scroll.observeActiveSection(
      root,
      sectionIds,
      (id) => {
        activeSection.value = id
      },
      { initialId: preferred }
    )
    stopScrollGate?.()
    stopScrollGate = scroll.bindSectionScrollGate(root)
  })
}

function bootMotion(): void {
  const generation = ++motionGate.generation
  stopMotion()

  void nextTick().then(() => {
    if (generation !== motionGate.generation || !rootEl.value) return
    const root = rootEl.value
    const sectionIds = railSections.value.map((section) => section.id)
    const knownIds = layoutSections.value.map((section) => section.id)

    if (!hasFrameEffects.value || knownIds.length === 0) {
      markReady(root)
      return
    }

    activeSection.value = sectionIds[0] ?? knownIds[0] ?? ''

    if (!isIrisEnabled.value) {
      markReady(root)
      const html = document.documentElement
      html.classList.remove('nuc-iris-boot', 'nuc-iris-armed')
      delete html.dataset.nucIrisArmed
      void Promise.all([
        import('../utils/frame_section_reveal'),
        import('../utils/frame_scroll'),
      ]).then(([{ markShellScrollReady }, scroll]) => {
        if (generation !== motionGate.generation) return
        markShellScrollReady(root)
        stopObserver = scroll.observeActiveSection(
          root,
          sectionIds,
          (id) => {
            activeSection.value = id
          },
          { initialId: activeSection.value }
        )
        stopScrollGate = scroll.bindSectionScrollGate(root)
      })
      return
    }

    if (isAutomatedAudit()) {
      markReady(root)
      root.classList.add('nuc-static')
      void import('../utils/frame_scroll').then(({ observeActiveSection }) => {
        if (generation !== motionGate.generation) return
        stopObserver = observeActiveSection(
          root,
          sectionIds,
          (id) => {
            activeSection.value = id
          },
          { initialId: activeSection.value }
        )
      })
      return
    }

    void Promise.all([
      import('./frame_boot'),
      import('../sections/thank_you/motion'),
      import('../utils/play_frame_animations'),
    ])
      .then(([boot, thankYou, anim]) => {
        if (generation !== motionGate.generation) return
        const preset =
          frameVariant.value === 'thankYou'
            ? thankYou.thankYouFrameBoot
            : frameVariant.value === 'pitch'
              ? boot.pitchFrameBoot
              : boot.productFrameBoot
        return anim
          .playFrameAnimations(root, preset, {
            enableIris: isIrisEnabled.value,
          })
          .then((stop) => {
            if (generation !== motionGate.generation) {
              stop?.()
              return
            }
            syncFrameModifiers(root)
            stopAnimations = stop
          })
      })
      .catch(() => {
        if (generation !== motionGate.generation) return
        markReady(root)
      })

    void import('../utils/frame_scroll').then((scroll) => {
      void scroll.whenFrameReady(root).then(() => {
        if (generation !== motionGate.generation) return
        stopObserver = scroll.observeActiveSection(
          root,
          sectionIds,
          (id) => {
            activeSection.value = id
          },
          { initialId: activeSection.value }
        )
        stopScrollGate = scroll.bindSectionScrollGate(root)
      })
    })
  })
}

onMounted(() => {
  // Do NOT add `.nuc-booting` here — that lifts opacity:1 before iris/anime
  // chunks load (slow Safari/Firefox flash). playFrameAnimations arms it.
  bootMotion()
})

// Reboot motion only when section identity / chrome mode changes — not on
// live prop patches, reorder, or soft add/remove (those soft-settle instead).
watch(
  () =>
    [
      [...frame.value.sections]
        .map((s) => `${s.id}:${s.type}`)
        .sort()
        .join('|'),
      frame.value.variant,
      isIrisEnabled.value,
      showRail.value,
      showShear.value,
      hasFrameEffects.value,
    ].join('::'),
  (next, prev) => {
    if (!rootEl.value || next === prev) return
    if (frame.value.softMotionOnly) return
    bootMotion()
  }
)

watch(
  () => frame.value.softRevealTick ?? 0,
  async (tick, prev) => {
    if (!tick || tick === prev) return
    const slideIndex = frame.value.preserveSlideIndex ?? 0
    const sectionId =
      frame.value.preserveSectionId ||
      railSections.value[slideIndex]?.id ||
      null
    const appendCut = frame.value.softRevealMode === 'append'
    // Clear early so a follow-up identity change can still bootMotion.
    frame.value.preserveSlideIndex = null
    frame.value.preserveSectionId = null
    frame.value.softRevealMode = null
    frame.value.softMotionOnly = false
    if (!rootEl.value) return
    const root = rootEl.value
    // captureSlideIndex already armed soft-reorder for non-append; keep freeze.
    if (!appendCut) {
      root.dataset.softReorder = '1'
      freezeScrollerForReorder(root)
    } else {
      root.removeAttribute('data-soft-reorder')
    }
    await nextTick()
    if (!rootEl.value) return

    const scroller = root.querySelector<HTMLElement>('.nuc-scroller') ?? root
    const panels = Array.from(
      scroller.querySelectorAll<HTMLElement>(':scope > .nuc-panel')
    )
    const target =
      panels[Math.max(0, Math.min(slideIndex, panels.length - 1))] ?? null

    if (appendCut && target) {
      // Hard cut: hide every other panel so the scroll jump is invisible,
      // then play the new section's normal entrance once binders attach.
      for (const panel of panels) {
        if (panel !== target) panel.style.setProperty('visibility', 'hidden')
      }
      scrollToSlideIndex(root, slideIndex, { holdFreeze: true })
      if (sectionId) activeSection.value = sectionId
      else {
        activeSection.value =
          railSections.value[slideIndex]?.id ?? activeSection.value
      }
      await nextTick()
      if (!rootEl.value) return
      scrollToSlideIndex(root, slideIndex, { holdFreeze: true })
      let played = false
      for (let i = 0; i < 12; i++) {
        played = playSlideEntrance(root, slideIndex)
        if (played) break
        await new Promise<void>((r) => requestAnimationFrame(() => r()))
        if (!rootEl.value) return
        scrollToSlideIndex(root, slideIndex, { holdFreeze: true })
      }
      // Only settle if entrance never hooked — otherwise let the one play finish.
      if (!played) {
        settleSlidePanel(root, slideIndex)
        settleVisibleShellPanels(root)
      }
      for (const panel of panels) {
        panel.style.removeProperty('visibility')
      }
      unfreezeScroller(root)
      rebindSectionObserver(activeSection.value)
      return
    }

    // Pin immediately after Vue reorders — do not await lazy imports first
    // (that gap lets the browser scroll-anchor to the moved section).
    scrollToSlideIndex(root, slideIndex, { holdFreeze: true })
    if (sectionId) activeSection.value = sectionId
    else {
      activeSection.value =
        railSections.value[slideIndex]?.id ?? activeSection.value
    }
    await nextTick()
    if (!rootEl.value) return
    scrollToSlideIndex(root, slideIndex, { holdFreeze: true })
    // Replay entrance on the pinned slide (IO stays muted via soft-reorder).
    let played = false
    for (let i = 0; i < 12; i++) {
      played = playSlideEntrance(root, slideIndex)
      if (played) break
      await new Promise<void>((r) => requestAnimationFrame(() => r()))
      if (!rootEl.value) return
      scrollToSlideIndex(root, slideIndex, { holdFreeze: true })
    }
    if (!played) {
      settleSlidePanel(root, slideIndex)
      settleVisibleShellPanels(root)
    }
    unfreezeScroller(root)
    rebindSectionObserver(activeSection.value)
    // Hold through wipe+stagger so late IO cannot prepare mid-entrance.
    window.setTimeout(
      () => {
        rootEl.value?.removeAttribute('data-soft-reorder')
      },
      played ? 1600 : 120
    )
  }
)

// Keep rail observer in sync when anchors change without a full motion reboot.
watch(
  () => railSections.value.map((s) => s.id).join('|'),
  (next, prev) => {
    if (!rootEl.value || !prev || next === prev) return
    if (frame.value.softMotionOnly) return
    rebindSectionObserver()
  }
)

onBeforeUnmount(() => {
  motionGate.generation += 1
  stopMotion()
})
</script>

<style lang="scss">
@import './frame';

.nuc-frame__unknown {
  padding: 1rem 1.5rem;
  color: var(--frame-muted, #8a8a8a);
  font-family: ui-monospace, monospace;
  font-size: 0.85rem;
}

.nuc-frame--bare.nuc-frame {
  min-height: 100%;
}

.nuc-frame--bare .nuc-inner,
.nuc-frame--bare .nuc-scroller {
  height: auto;
  min-height: 100%;
  overflow: visible;
}
</style>
