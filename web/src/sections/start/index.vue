<template>
  <section
    :id="anchorId"
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
        <nui-icon icon="mdi:arrow-down" />
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
  NucHomeModuleBoard as NucModuleBoard,
  resolveSectionAnchor,
  scrollSection,
  useCmsAttrs,
  useHomeCmsCopy,
} from '@web'

defineOptions({ inheritAttrs: false })

const cms = useCmsAttrs()
const copy = useHomeCmsCopy()
const modules = computed(() => cmsHomeModules(cms))
const anchorId = computed(
  () => resolveSectionAnchor('section.start', cms) || 'start'
)

function onCta(): void {
  const root = document.querySelector<HTMLElement>('.nuc-shell')
  if (!root) return
  scrollSection(root, 'contact')
}
</script>

<style lang="scss" scoped>
@import 'index';
</style>
