<template>
  <section
    ref="rootEl"
    id="pulse"
    class="nuc-section nuc-pulse nuc-panel"
    aria-labelledby="nuc-pulse-title"
  >
    <div class="nuc-pulse-copy">
      <p class="nuc-eyebrow">{{ copy.pulseEyebrow }}</p>
      <h2 id="nuc-pulse-title" class="nuc-title nuc-pulse-title">
        <span class="nuc-pulse-title-line">{{ copy.pulseTitleLead }}</span>
        <span class="nuc-pulse-title-line is-nowrap"
          >{{ copy.pulseTitleTrail }}</span
        >
      </h2>
      <p class="nuc-support">{{ copy.pulseSupport }}</p>
      <p class="nuc-pulse-compare">{{ copy.pulseCompare }}</p>
      <button type="button" class="nuc-next" @click="onCta">
        <span>{{ copy.pulseCta }}</span>
        <nui-icon icon="mdi:arrow-down" />
      </button>
    </div>

    <div ref="stageEl" class="nuc-pulse-stage">
      <div class="nuc-pulse-axis">
        <span class="nuc-pulse-axis-label">
          {{ copy.pulseShellsAxis }}
        </span>
        <ul class="nuc-pulse-shells">
          <li
            v-for="(shell, index) in shells"
            :key="shell"
            class="nuc-pulse-shell"
            :class="{ 'is-on': index < shellsActive }"
          >
            {{ shell }}
          </li>
        </ul>
      </div>

      <div class="nuc-pulse-chart">
        <div class="nuc-pulse-row nuc-pulse-row-flat">
          <div class="nuc-pulse-row-meta">
            <span class="nuc-pulse-row-label">
              {{ copy.pulseNucleifyLabel }}
            </span>
            <span class="nuc-pulse-row-value">
              {{ copy.pulseCostSuffix }}{{ nucleifyCost }}
            </span>
          </div>
          <div class="nuc-pulse-track" aria-hidden="true">
            <span
              class="nuc-pulse-fill nuc-pulse-fill-flat"
              :style="{ width: nucleifyWidth }"
            />
          </div>
          <p class="nuc-pulse-row-note">
            {{ nucleifyCost }}× {{ copy.pulseUnitLabel }}
          </p>
        </div>

        <div class="nuc-pulse-row nuc-pulse-row-tax">
          <div class="nuc-pulse-row-meta">
            <span class="nuc-pulse-row-label">
              {{ copy.pulseTraditionalLabel }}
            </span>
            <span class="nuc-pulse-row-value">
              {{ copy.pulseCostSuffix }}{{ traditionalCost }}
            </span>
          </div>
          <div class="nuc-pulse-track" aria-hidden="true">
            <span
              class="nuc-pulse-fill nuc-pulse-fill-tax"
              :style="{ width: traditionalWidth }"
            />
          </div>
          <p class="nuc-pulse-row-note">
            {{ traditionalCost }}× {{ copy.pulseUnitLabel }}
          </p>
        </div>
      </div>

      <p
        class="nuc-pulse-status"
        :class="{ 'is-on': isScaling || showStatus, 'is-scaling': isScaling }"
      >
        <template v-if="isScaling">
          <nui-icon icon="mdi:loading" class="nuc-pulse-status-spin" />
          <span>
            {{ copy.pulseScaling }}
            <span class="nuc-pulse-status-dots" aria-hidden="true" />
          </span>
        </template>
        <template v-else>
          <span class="nuc-pulse-status-dot" />
          {{ copy.pulseStatus }}
        </template>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import {
  cmsHomePulseShells,
  createPulseScalePlayer,
  isAutomatedAudit,
  scrollSection,
  useCmsAttrs,
  useHomeCmsCopy,
  useShellSectionReveal,
} from '@web'
import { pulseReveal } from './motion'

defineOptions({ inheritAttrs: false })

const rootEl = ref<HTMLElement | null>(null)
useShellSectionReveal(rootEl, pulseReveal)

const cms = useCmsAttrs()
const copy = useHomeCmsCopy()
const shells = computed(() => cmsHomePulseShells(cms))
const maxShells = computed(() => Math.max(shells.value.length, 1))

const stageEl = ref<HTMLElement | null>(null)
const shellsActive = ref(0)
const showStatus = ref(false)
const isScaling = ref(false)

const traditionalCost = computed(() => Math.max(shellsActive.value, 0))
const nucleifyCost = computed(() => (shellsActive.value > 0 ? 1 : 0))
const traditionalWidth = computed(
  () => `${(traditionalCost.value / maxShells.value) * 100}%`
)
const nucleifyWidth = computed(
  () => `${(nucleifyCost.value / maxShells.value) * 100}%`
)

let player: ReturnType<typeof createPulseScalePlayer> | undefined
let observer: IntersectionObserver | undefined

function onCta(): void {
  const root = document.querySelector<HTMLElement>('.nuc-shell')
  if (!root) return
  scrollSection(root, 'start')
}

onMounted(() => {
  player = createPulseScalePlayer({
    shellCount: maxShells.value,
    prefersReducedMotion: () =>
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      isAutomatedAudit(),
    apply: (state) => {
      shellsActive.value = state.shellsActive
      showStatus.value = state.showStatus
      isScaling.value = !state.showStatus
    },
  })

  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    isAutomatedAudit()
  ) {
    player.start()
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (!entry || !player) return
      if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
        player.start()
      } else if (entry.intersectionRatio <= 0.12) {
        player.stop()
      }
    },
    { threshold: [0, 0.12, 0.35, 0.6] }
  )

  if (stageEl.value) observer.observe(stageEl.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  player?.stop()
})
</script>

<style lang="scss" scoped>
@import 'index';
</style>
