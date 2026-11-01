<template>
  <div
    ref="rootEl"
    class="nuc-shell"
    :class="{
      'nuc-menu-open': menuOpen,
      'is-pitch': isPitch,
      'nuc-no-iris': !isIrisEnabled,
    }"
  >
    <NucShear v-if="railSections.length" />
    <NucRail
      v-if="railSections.length"
      :sections="railSections"
      :active-section="activeSection"
      :aria-label="shell.railAriaLabel"
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

import {
  orderedKnownSections,
  railItemsFromSections,
} from '../cms/section_registry'
import { usePublicShellPage } from '../composables/use_public_shell_page'
import {
  useShellPage,
  resolveShellVariant,
} from '../composables/use_shell_page'
import NucRail from '../templates/rail/index.vue'
import NucShear from '../templates/shear/index.vue'
import { isAutomatedAudit } from '../utils/is_lab'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))
// Layout renders before the page Suspense resolves — await the same shell
// payload here so rail/shear are not SSR'd as empty comments.
await usePublicShellPage(slug)

const shell = useShellPage()

const layoutSections = computed(() =>
  orderedKnownSections(shell.value.sections)
)
const railSections = computed(() => railItemsFromSections(layoutSections.value))
const shellVariant = computed(() =>
  resolveShellVariant(layoutSections.value, shell.value.variant)
)
const isPitch = computed(() => shellVariant.value === 'pitch')
const isIrisEnabled = computed(() => shell.value.enableIris !== false)

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
  void import('../utils/shell_scroll').then(({ scrollSection }) => {
    scrollSection(rootEl.value!, id)
  })
}

function syncShellModifiers(root: HTMLElement): void {
  root.classList.toggle('is-pitch', isPitch.value)
}

function markReady(root: HTMLElement): void {
  root.style.setProperty('--shell-iris', '165%')
  root.classList.remove('nuc-booting')
  root.classList.add('nuc-ready')
  syncShellModifiers(root)
}

function stopMotion(): void {
  stopScrollGate?.()
  stopScrollGate = undefined
  stopObserver?.()
  stopObserver = undefined
  stopAnimations?.()
  stopAnimations = undefined
}

function bootMotion(): void {
  const generation = ++motionGate.generation
  stopMotion()

  void nextTick().then(() => {
    if (generation !== motionGate.generation || !rootEl.value) return
    const root = rootEl.value
    const sectionIds = railSections.value.map((section) => section.id)
    const knownIds = layoutSections.value.map((section) => section.id)
    if (knownIds.length === 0) {
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
        import('../utils/shell_section_reveal'),
        import('../utils/shell_scroll'),
      ]).then(([{ markShellScrollReady }, scroll]) => {
        if (generation !== motionGate.generation) return
        markShellScrollReady(root)
        stopObserver = scroll.observeActiveSection(root, sectionIds, (id) => {
          activeSection.value = id
        })
        stopScrollGate = scroll.bindSectionScrollGate(root)
      })
      return
    }

    if (isAutomatedAudit()) {
      markReady(root)
      root.classList.add('nuc-static')
      void import('../utils/shell_scroll').then(({ observeActiveSection }) => {
        if (generation !== motionGate.generation) return
        stopObserver = observeActiveSection(root, sectionIds, (id) => {
          activeSection.value = id
        })
      })
      return
    }

    void Promise.all([
      import('../templates/shell_boot'),
      import('../sections/thank_you/motion'),
      import('../utils/play_shell_animations'),
    ])
      .then(([boot, thankYou, anim]) => {
        if (generation !== motionGate.generation) return
        const preset =
          shellVariant.value === 'thankYou'
            ? thankYou.thankYouShellBoot
            : shellVariant.value === 'pitch'
              ? boot.pitchShellBoot
              : boot.productShellBoot
        return anim
          .playShellAnimations(root, preset, {
            enableIris: isIrisEnabled.value,
          })
          .then((stop) => {
            if (generation !== motionGate.generation) {
              stop?.()
              return
            }
            syncShellModifiers(root)
            stopAnimations = stop
          })
      })
      .catch(() => {
        if (generation !== motionGate.generation) return
        markReady(root)
      })

    void import('../utils/shell_scroll').then((scroll) => {
      void scroll.whenShellReady(root).then(() => {
        if (generation !== motionGate.generation) return
        stopObserver = scroll.observeActiveSection(root, sectionIds, (id) => {
          activeSection.value = id
        })
        stopScrollGate = scroll.bindSectionScrollGate(root)
      })
    })
  })
}

onMounted(() => {
  if (
    rootEl.value &&
    isIrisEnabled.value &&
    !rootEl.value.classList.contains('nuc-ready')
  ) {
    rootEl.value.classList.add('nuc-booting')
  }
  bootMotion()
})

watch(
  () =>
    [
      shell.value.sections.map((s) => `${s.id}:${s.type}`).join('|'),
      shell.value.variant,
      isPitch.value,
      isIrisEnabled.value,
    ] as const,
  () => {
    if (!rootEl.value) return
    bootMotion()
  }
)

onBeforeUnmount(() => {
  motionGate.generation += 1
  stopMotion()
})
</script>

<style lang="scss">
@import 'shell';

.nuc-shell__unknown {
  padding: 1rem 1.5rem;
  color: var(--shell-muted, #8a8a8a);
  font-family: ui-monospace, monospace;
  font-size: 0.85rem;
}
</style>
