<template>
  <div
    class="nuc-slice"
    :data-module="active.id"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div class="nuc-core-board">
      <div class="nuc-core-stage">
        <NucHomeHoloCube
          :focus="focusId"
          :faces="faceMeta"
          :paused="hovering || paused"
          @focus="focusLane"
        />

        <div
          class="nuc-core-readout"
          :key="`${active.id}:${focused.id}`"
          aria-live="polite"
        >
          <p class="nuc-core-readout-kicker">
            {{ inspectLabel }}
            <em>{{ laneLabel(focused.id) }}</em>
          </p>
          <p class="nuc-core-readout-file">{{ focused.title }}</p>
          <p class="nuc-core-readout-dir">{{ laneHint(focused.path) }}</p>
          <p class="nuc-core-readout-detail">{{ focused.detail }}</p>
          <p class="nuc-core-integrity">{{ liveLabel }}</p>
        </div>
      </div>

      <div class="nuc-core-picks" role="tablist" aria-label="Shared modules">
        <button
          v-for="(item, index) in moduleList"
          :key="item.id"
          type="button"
          role="tab"
          class="nuc-core-pick"
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
  coalesceArray,
  coalesceString,
  isAutomatedAudit,
  NUC_HOME_COPY,
  NUC_HOME_MODULES,
  type NucHomeModule,
  type NucHomeModuleLaneId,
} from '@web'
import { NucHoloCube as NucHomeHoloCube } from '@web'

const FACE_ORDER: NucHomeModuleLaneId[] = ['ui', 'sdk', 'data']

const props = defineProps<{
  modules?: NucHomeModule[]
  coreInspect?: string
  coreLive?: string
  coreLaneSdk?: string
  coreLaneData?: string
  coreLaneUi?: string
  laneSdk?: string
  laneData?: string
  laneUi?: string
}>()

const moduleList = computed(
  () => coalesceArray(props.modules, NUC_HOME_MODULES) as NucHomeModule[]
)

const inspectLabel = computed(() =>
  coalesceString(props.coreInspect, NUC_HOME_COPY.coreInspect)
)
const liveLabel = computed(() =>
  coalesceString(props.coreLive, NUC_HOME_COPY.coreLive)
)

const activeIndex = ref(0)
const focusId = ref<NucHomeModuleLaneId>('sdk')
const paused = ref(false)
const hovering = ref(false)

const active = computed(
  () => moduleList.value[activeIndex.value] ?? moduleList.value[0]!
)
const focused = computed(
  () =>
    active.value.lanes.find(
      (lane: { id: NucHomeModuleLaneId }) => lane.id === focusId.value
    ) ?? active.value.lanes[0]!
)

const laneLabels = computed(
  (): Record<NucHomeModuleLaneId, string> => ({
    sdk: coalesceString(
      props.coreLaneSdk ?? props.laneSdk,
      NUC_HOME_COPY.coreLaneSdk
    ),
    data: coalesceString(
      props.coreLaneData ?? props.laneData,
      NUC_HOME_COPY.coreLaneData
    ),
    ui: coalesceString(
      props.coreLaneUi ?? props.laneUi,
      NUC_HOME_COPY.coreLaneUi
    ),
  })
)

const faceMeta = computed(() =>
  FACE_ORDER.map((id) => ({ id, label: laneLabels.value[id] }))
)

function laneLabel(id: NucHomeModuleLaneId): string {
  return laneLabels.value[id]
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
  const len = moduleList.value.length
  if (len === 0) return
  activeIndex.value = (activeIndex.value + 1) % len
}

watch(
  () => active.value.id,
  (_id?: string) => {
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
@import 'index';
</style>
