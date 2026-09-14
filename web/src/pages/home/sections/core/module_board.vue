<template>
  <div
    class="nuc-home-slice"
    :data-module="active.id"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div class="nuc-home-core-board">
      <div class="nuc-home-core-stage">
        <NucHomeHoloCube
          :focus="focusId"
          :faces="faceMeta"
          :paused="hovering || paused"
          @focus="focusLane"
        />

        <div
          class="nuc-home-core-readout"
          :key="`${active.id}:${focused.id}`"
          aria-live="polite"
        >
          <p class="nuc-home-core-readout-kicker">
            {{ copy.coreInspect }}
            <em>{{ laneLabel(focused.id) }}</em>
          </p>
          <p class="nuc-home-core-readout-file">{{ focused.title }}</p>
          <p class="nuc-home-core-readout-dir">{{ laneHint(focused.path) }}</p>
          <p class="nuc-home-core-readout-detail">{{ focused.detail }}</p>
          <p class="nuc-home-core-integrity">{{ copy.coreLive }}</p>
        </div>
      </div>

      <div
        class="nuc-home-core-picks"
        role="tablist"
        aria-label="Shared modules"
      >
        <button
          v-for="(item, index) in modules"
          :key="item.id"
          type="button"
          role="tab"
          class="nuc-home-core-pick"
          :class="{ 'is-active': index === activeIndex }"
          :aria-selected="index === activeIndex"
          :aria-label="item.name"
          @mouseenter="select(index, false)"
          @focus="select(index, false)"
          @click="select(index, true)"
        >
          <nui-icon :icon="item.icon" />
          <span>{{ shortName(item.name) }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import {
  NUC_HOME_COPY,
  NUC_HOME_MODULES,
  type NucHomeModuleLaneId,
} from '../../constants/content'
import { isAutomatedAudit } from '../../utils/is_automated_audit'
import NucHomeHoloCube from './holo_cube.vue'

const FACE_ORDER: NucHomeModuleLaneId[] = ['ui', 'sdk', 'data']

const copy = NUC_HOME_COPY
const modules = NUC_HOME_MODULES

const activeIndex = ref(0)
const focusId = ref<NucHomeModuleLaneId>('sdk')
const paused = ref(false)
const hovering = ref(false)

const active = computed(() => modules[activeIndex.value] ?? modules[0]!)
const focused = computed(
  () =>
    active.value.lanes.find((lane) => lane.id === focusId.value) ??
    active.value.lanes[0]!
)

const laneLabels: Record<NucHomeModuleLaneId, string> = {
  sdk: copy.coreLaneSdk,
  data: copy.coreLaneData,
  ui: copy.coreLaneUi,
}

const faceMeta = computed(() =>
  FACE_ORDER.map((id) => ({ id, label: laneLabels[id] }))
)

function laneLabel(id: NucHomeModuleLaneId): string {
  return laneLabels[id]
}

function shortName(name: string): string {
  return name.replace(/^nuc_/, '')
}

function laneHint(path: string): string {
  const parts = path.replace(/^shared_modules\//, '').split('/')
  const mod = parts[0] ?? path
  const leaf = (parts.at(-1) ?? path).replace(/\.(ts|tsx|scss)$/, '')
  return `${mod} · ${leaf}`
}

function focusLane(id: NucHomeModuleLaneId): void {
  focusId.value = id
  paused.value = true
}

function select(index: number, lock = false): void {
  activeIndex.value = index
  if (lock) paused.value = true
}

let timer: number | undefined

function tick(): void {
  if (paused.value || hovering.value) return
  activeIndex.value = (activeIndex.value + 1) % modules.length
}

watch(
  () => active.value.id,
  () => {
    focusId.value = 'sdk'
  }
)

onMounted(() => {
  focusId.value = 'sdk'
  if (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    isAutomatedAudit()
  )
    return
  timer = window.setInterval(tick, 4800)
})

onBeforeUnmount(() => {
  if (timer) window.clearInterval(timer)
})
</script>

<style lang="scss" scoped>
@import 'board';
</style>
