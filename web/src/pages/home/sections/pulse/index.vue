<template>
  <section
    id="pulse"
    class="nuc-home-section nuc-home-pulse nuc-home-panel"
    aria-labelledby="nuc-home-pulse-title"
  >
    <div class="nuc-home-pulse-copy">
      <p class="nuc-home-eyebrow">{{ copy.pulseEyebrow }}</p>
      <h2 id="nuc-home-pulse-title" class="nuc-home-title">
        {{ copy.pulseTitle }}
      </h2>
      <p class="nuc-home-support">{{ copy.pulseSupport }}</p>
      <p class="nuc-home-pulse-compare">{{ copy.pulseCompare }}</p>
      <button type="button" class="nuc-home-next" @click="onCta">
        <span>{{ copy.pulseCta }}</span>
        <nui-icon icon="mdi:arrow-down" />
      </button>
    </div>

    <div ref="stageEl" class="nuc-home-pulse-stage">
      <div class="nuc-home-pulse-axis">
        <span class="nuc-home-pulse-axis-label">
          {{ copy.pulseShellsAxis }}
        </span>
        <ul class="nuc-home-pulse-shells">
          <li
            v-for="(shell, index) in shells"
            :key="shell"
            class="nuc-home-pulse-shell"
            :class="{ 'is-on': index < shellsActive }"
          >
            {{ shell }}
          </li>
        </ul>
      </div>

      <div class="nuc-home-pulse-chart">
        <div class="nuc-home-pulse-row nuc-home-pulse-row-tax">
          <div class="nuc-home-pulse-row-meta">
            <span class="nuc-home-pulse-row-label">
              {{ copy.pulseTraditionalLabel }}
            </span>
            <span class="nuc-home-pulse-row-value">
              {{ copy.pulseCostSuffix }}{{ traditionalCost }}
            </span>
          </div>
          <div class="nuc-home-pulse-track" aria-hidden="true">
            <span
              class="nuc-home-pulse-fill nuc-home-pulse-fill-tax"
              :style="{ width: traditionalWidth }"
            />
          </div>
          <p class="nuc-home-pulse-row-note">
            {{ traditionalCost }}× {{ copy.pulseUnitLabel }}
          </p>
        </div>

        <div class="nuc-home-pulse-row nuc-home-pulse-row-flat">
          <div class="nuc-home-pulse-row-meta">
            <span class="nuc-home-pulse-row-label">
              {{ copy.pulseNucleifyLabel }}
            </span>
            <span class="nuc-home-pulse-row-value">
              {{ copy.pulseCostSuffix }}{{ nucleifyCost }}
            </span>
          </div>
          <div class="nuc-home-pulse-track" aria-hidden="true">
            <span
              class="nuc-home-pulse-fill nuc-home-pulse-fill-flat"
              :style="{ width: nucleifyWidth }"
            />
          </div>
          <p class="nuc-home-pulse-row-note">
            {{ nucleifyCost }}× {{ copy.pulseUnitLabel }}
          </p>
        </div>
      </div>

      <p
        class="nuc-home-pulse-status"
        :class="{ 'is-on': isScaling || showStatus, 'is-scaling': isScaling }"
      >
        <template v-if="isScaling">
          <nui-icon icon="mdi:loading" class="nuc-home-pulse-status-spin" />
          <span>
            {{ copy.pulseScaling }}
            <span class="nuc-home-pulse-status-dots" aria-hidden="true" />
          </span>
        </template>
        <template v-else>
          <span class="nuc-home-pulse-status-dot" />
          {{ copy.pulseStatus }}
        </template>
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import { NUC_HOME_COPY, NUC_HOME_PULSE_SHELLS } from '../../constants/content'
import { isAutomatedAudit } from '../../utils/is_automated_audit'
import { scrollHomeSection } from '../../utils/observe_active_section'
import { createPulseScalePlayer } from '../../utils/pulse_terminal_player'

const copy = NUC_HOME_COPY
const shells = NUC_HOME_PULSE_SHELLS
const maxShells = shells.length

const stageEl = ref<HTMLElement | null>(null)
const shellsActive = ref(0)
const showStatus = ref(false)
const isScaling = ref(false)

const traditionalCost = computed(() => Math.max(shellsActive.value, 0))
const nucleifyCost = computed(() => (shellsActive.value > 0 ? 1 : 0))
const traditionalWidth = computed(
  () => `${(traditionalCost.value / maxShells) * 100}%`
)
const nucleifyWidth = computed(
  () => `${(nucleifyCost.value / maxShells) * 100}%`
)

let player: ReturnType<typeof createPulseScalePlayer> | undefined
let observer: IntersectionObserver | undefined

function onCta(): void {
  const root = document.querySelector<HTMLElement>('.nuc-home')
  if (!root) return
  scrollHomeSection(root, 'start')
}

onMounted(() => {
  player = createPulseScalePlayer({
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
