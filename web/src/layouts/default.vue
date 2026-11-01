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
        <p v-if="showPending" class="nuc-shell__status">Loading…</p>
        <component
          :is="resolveCmsSection(section.type)"
          v-for="section in layoutSections"
          :key="section.id"
          v-bind="sectionBindAttrs(section)"
        />
        <p
          v-for="section in unknownSections"
          :key="`unknown-${section.id}`"
          class="nuc-shell__unknown"
        >
          Unknown section type: {{ section.type }}
        </p>
        <slot v-if="!layoutSections.length && !showPending" />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import {
  isAutomatedAudit,
  isKnownCmsSection,
  NucRail,
  NucShear,
  orderedKnownSections,
  railItemsFromSections,
  resolveCmsSection,
  resolveShellVariant,
  sectionBindAttrs,
  useShellPage,
} from '@web'

const shell = useShellPage()

const layoutSections = computed(() =>
  orderedKnownSections(shell.value.sections)
)
const railSections = computed(() => railItemsFromSections(layoutSections.value))
const unknownSections = computed(() =>
  [...(shell.value.sections ?? [])].filter((s) => !isKnownCmsSection(s.type))
)
const shellVariant = computed(() =>
  resolveShellVariant(layoutSections.value, shell.value.variant)
)
const isPitch = computed(() => shellVariant.value === 'pitch')
const isIrisEnabled = computed(() => shell.value.enableIris !== false)
const showPending = computed(
  () => shell.value.pending && layoutSections.value.length === 0
)

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
  void import('@web').then(({ scrollSection }) => {
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
      void import('@web').then(
        ({
          markShellScrollReady,
          observeActiveSection,
          bindSectionScrollGate,
        }) => {
          if (generation !== motionGate.generation) return
          markShellScrollReady(root)
          stopObserver = observeActiveSection(root, sectionIds, (id) => {
            activeSection.value = id
          })
          stopScrollGate = bindSectionScrollGate(root)
        }
      )
      return
    }

    if (isAutomatedAudit()) {
      markReady(root)
      root.classList.add('nuc-static')
      void import('@web').then(({ observeActiveSection }) => {
        if (generation !== motionGate.generation) return
        stopObserver = observeActiveSection(root, sectionIds, (id) => {
          activeSection.value = id
        })
      })
      return
    }

    void import('@web')
      .then((m) => {
        if (generation !== motionGate.generation) return
        const boot =
          shellVariant.value === 'thankYou'
            ? m.thankYouShellBoot
            : shellVariant.value === 'pitch'
              ? m.pitchShellBoot
              : m.productShellBoot
        return m
          .playShellAnimations(root, boot, {
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

    void import('@web').then(({ whenShellReady }) => {
      void whenShellReady(root).then(() => {
        if (generation !== motionGate.generation) return
        void import('@web').then(({ observeActiveSection }) => {
          if (generation !== motionGate.generation) return
          stopObserver = observeActiveSection(root, sectionIds, (id) => {
            activeSection.value = id
          })
        })

        void import('@web').then(({ bindSectionScrollGate }) => {
          if (generation !== motionGate.generation) return
          stopScrollGate = bindSectionScrollGate(root)
        })
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
</style>

<style scoped>
.nuc-shell__unknown,
.nuc-shell__status {
  padding: 1rem 1.5rem;
  color: var(--shell-muted, #8a8a8a);
  font-family: ui-monospace, monospace;
  font-size: 0.85rem;
}

.nuc-shell__status {
  min-height: 100%;
  margin: 0;
  background: var(--shell-bg, #03050c);
}
</style>
