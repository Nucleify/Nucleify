<template>
  <section
    id="core"
    class="nuc-home-section nuc-home-core nuc-home-panel"
    aria-labelledby="nuc-home-core-title"
    :style="stageStyle"
  >
    <div class="nuc-home-core-head">
      <p class="nuc-home-eyebrow">{{ copy.coreEyebrow }}</p>
      <h2 id="nuc-home-core-title" class="nuc-home-title">
        {{ copy.coreTitle }}
      </h2>
      <p class="nuc-home-support">{{ copy.coreSupport }}</p>
    </div>

    <div
      class="nuc-home-core-stage"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <div class="nuc-home-core-canvas" :class="{ 'is-wiping': wiping }">
        <div class="nuc-home-core-aura" aria-hidden="true" />
        <div class="nuc-home-core-orbit" aria-hidden="true" />

        <div class="nuc-home-core-portal" aria-hidden="true">
          <div
            class="nuc-home-core-layer nuc-home-core-layer-shipped"
            :class="`nuc-home-core-layer-${active.id}`"
          >
            <div class="nuc-home-core-chrome">
              <i /><i /><i />
              <em>{{ copy.coreShippedLabel }}</em>
            </div>
            <div class="nuc-home-core-screen">
              <div class="nuc-home-core-preview-top" />
              <div class="nuc-home-core-preview-body">
                <span /><span /><span />
              </div>
              <div class="nuc-home-core-swatches">
                <b /><b /><b /><b />
              </div>
            </div>
          </div>

          <div
            class="nuc-home-core-layer nuc-home-core-layer-yours"
            :class="`nuc-home-core-layer-${active.id}`"
          >
            <div class="nuc-home-core-chrome">
              <i /><i /><i />
              <em>{{ copy.coreYoursLabel }}</em>
            </div>
            <div class="nuc-home-core-screen">
              <div class="nuc-home-core-preview-top" />
              <div class="nuc-home-core-preview-body">
                <span /><span /><span />
              </div>
              <div class="nuc-home-core-swatches">
                <b /><b /><b /><b />
              </div>
            </div>
          </div>

          <div class="nuc-home-core-blade">
            <span class="nuc-home-core-blade-glow" />
            <span class="nuc-home-core-blade-edge" />
            <span class="nuc-home-core-blade-tag">override</span>
          </div>
        </div>

        <aside class="nuc-home-core-legend" aria-live="polite">
          <div class="nuc-home-core-rail-item nuc-home-core-rail-item-shipped">
            <span class="nuc-home-core-diff nuc-home-core-diff-minus">−</span>
            <div>
              <p class="nuc-home-core-rail-kicker">
                {{ copy.coreShippedLabel }}
              </p>
              <p class="nuc-home-core-rail-path">{{ active.shippedPath }}</p>
              <p class="nuc-home-core-rail-note">{{ active.shippedNote }}</p>
            </div>
          </div>
          <div class="nuc-home-core-rail-item nuc-home-core-rail-item-yours">
            <span class="nuc-home-core-diff nuc-home-core-diff-plus">+</span>
            <div>
              <p class="nuc-home-core-rail-kicker">
                {{ copy.coreYoursLabel }}
              </p>
              <p class="nuc-home-core-rail-path">{{ active.yoursPath }}</p>
              <p class="nuc-home-core-rail-note">{{ active.yoursNote }}</p>
            </div>
          </div>
          <p class="nuc-home-core-keep">
            <nui-icon icon="mdi:shield-check-outline" />
            {{ copy.coreKeepLabel }}
          </p>
        </aside>
      </div>

      <div
        class="nuc-home-core-kinds"
        role="tablist"
        aria-label="Override kinds"
      >
        <button
          v-for="(sample, index) in samples"
          :key="sample.id"
          type="button"
          role="tab"
          class="nuc-home-core-kind"
          :class="{ 'is-active': index === activeIndex }"
          :aria-selected="index === activeIndex"
          @mouseenter="select(index, false)"
          @focus="select(index, false)"
          @click="select(index, true)"
        >
          <nui-icon :icon="sample.icon" />
          <span>{{ sample.kind }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  type CSSProperties,
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'

import { NUC_HOME_COPY, NUC_HOME_CRAFT_SAMPLES } from '../../constants/content'

const copy = NUC_HOME_COPY
const samples = NUC_HOME_CRAFT_SAMPLES

const activeIndex = ref(0)
const paused = ref(false)
const hovering = ref(false)
const wiping = ref(true)

const active = computed(() => samples[activeIndex.value] ?? samples[0]!)

const stageStyle = computed(
  () =>
    ({
      '--core-accent': active.value.accent,
    }) as CSSProperties
)

let timer: number | undefined

async function replayWipe(): Promise<void> {
  wiping.value = false
  await nextTick()
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      wiping.value = true
    })
  })
}

function select(index: number, lock = false): void {
  activeIndex.value = index
  if (lock) paused.value = true
}

function tick(): void {
  if (paused.value || hovering.value) return
  activeIndex.value = (activeIndex.value + 1) % samples.length
}

watch(activeIndex, () => {
  void replayWipe()
})

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    wiping.value = true
    return
  }
  timer = window.setInterval(tick, 3800)
})

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
})
</script>

<style lang="scss" scoped>
@import 'index';
</style>
