<template>
  <section
    :id="domId"
    class="nuc-section nuc-start nuc-panel"
    aria-labelledby="nuc-start-title"
  >
    <div class="nuc-start-head">
      <p class="nuc-eyebrow">{{ copy.startEyebrow }}</p>
      <h2 id="nuc-start-title" class="nuc-title">
        {{ copy.startTitle }}
      </h2>
      <button type="button" class="nuc-next" @click="onCta">
        <span>{{ copy.startCta }}</span>
        <nui-icon icon="mdi:arrow-down" mode="svg" />
      </button>
    </div>
    <NucModuleBoard
      :modules="modules"
      :core-inspect="copy.coreInspect"
      :core-live="copy.coreLive"
      :lane-sdk="copy.coreLaneSdk"
      :lane-data="copy.coreLaneData"
      :lane-ui="copy.coreLaneUi"
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import {
  cmsHomeModules,
  scrollFrameTo,
  useCmsAttrs,
  useHomeCmsCopy,
  useSectionDomId,
} from '@shared_modules'
import NucModuleBoard from '@shared_modules/nuc_cms/parts/module_board/index.vue'

defineOptions({ inheritAttrs: false })

const cms = useCmsAttrs()
const domId = useSectionDomId('start')
const copy = useHomeCmsCopy()
const modules = computed(() => cmsHomeModules(cms))

function onCta(): void {
  scrollFrameTo('contact')
}
</script>

<style lang="scss" scoped>
@import 'index';
</style>
