<template>
  <div
    class="nuc-slice"
    :class="visibilityClasses"
    :data-module="active.id"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div class="nuc-core-board">
      <div class="nuc-core-stage">
        <NucHomeHoloCube
          v-if="showAnyCube"
          :focus="focusId"
          :faces="faceMeta"
          :paused="hovering || paused"
          @focus="focusLane"
        />

        <div v-if="showAnyGlance" class="nuc-core-readout" aria-live="polite">
          <div
            class="nuc-core-readout-copy"
            :key="`${active.id}:${focused.id}`"
          >
            <p class="nuc-core-readout-file">{{ focused.title }}</p>
            <p class="nuc-core-readout-dir">{{ laneHint(focused.path) }}</p>
            <p class="nuc-core-readout-detail">{{ focused.detail }}</p>
            <p class="nuc-core-integrity">{{ liveLabel }}</p>
          </div>
        </div>
      </div>

      <div
        v-if="showAnyGlance"
        class="nuc-core-picks"
        role="tablist"
        aria-label="Shared modules"
      >
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
import { computed, ref, watch } from 'vue'

import {
  coalesceArray,
  coalesceString,
  DEFAULT_SHOW_CUBE_HOME,
  DEFAULT_SHOW_GLANCE_HOME,
  holoCubeFaces,
  NUC_HOME_COPY,
  NUC_HOME_MODULES,
  type BreakpointVisibility,
  type NucHomeModule,
  type NucHomeModuleLaneId,
  useAutoRotateIndex,
  useBreakpointPanel,
} from '@shared_modules'
import NucHomeHoloCube from '@shared_modules/nuc_cms/parts/holo_cube/index.vue'

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
  showCube?: BreakpointVisibility | boolean
  showGlance?: BreakpointVisibility | boolean
}>()

const moduleList = computed(
  () => coalesceArray(props.modules, NUC_HOME_MODULES) as NucHomeModule[]
)

const liveLabel = computed(() =>
  coalesceString(props.coreLive, NUC_HOME_COPY.coreLive)
)

const { showAnyCube, showAnyGlance, visibilityClasses } = useBreakpointPanel(
  () => props.showCube,
  () => props.showGlance,
  DEFAULT_SHOW_CUBE_HOME,
  DEFAULT_SHOW_GLANCE_HOME
)

const { activeIndex, paused, hovering, select } = useAutoRotateIndex({
  length: () => moduleList.value.length,
  intervalMs: 4800,
})

const focusId = ref<NucHomeModuleLaneId>('sdk')

const active = computed(
  () => moduleList.value[activeIndex.value] ?? moduleList.value[0]!
)
const focused = computed(
  () =>
    active.value.lanes.find(
      (lane: { id: NucHomeModuleLaneId }) => lane.id === focusId.value
    ) ?? active.value.lanes[0]!
)

const faceMeta = computed(() =>
  holoCubeFaces({
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

function shortName(name: string): string {
  return name.replace(/^nuc_/, '')
}

function laneHint(path: string): string {
  const parts = path.replace(/^shared_modules\//, '').split('/')
  return parts[0] ?? path
}

function focusLane(id: NucHomeModuleLaneId): void {
  focusId.value = id
  paused.value = true
}

watch(
  () => active.value.id,
  () => {
    focusId.value = 'sdk'
  }
)
</script>

<style lang="scss" scoped>
@import 'index';
</style>
