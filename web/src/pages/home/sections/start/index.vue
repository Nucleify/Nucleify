<template>
  <section
    id="start"
    class="nuc-home-section nuc-home-start nuc-home-panel"
    aria-labelledby="nuc-home-start-title"
  >
    <div class="nuc-home-start-head">
      <p class="nuc-home-eyebrow">{{ copy.startEyebrow }}</p>
      <h2 id="nuc-home-start-title" class="nuc-home-title">
        {{ copy.startTitle }}
      </h2>
      <button type="button" class="nuc-home-next" @click="onCta">
        <span>{{ copy.startCta }}</span>
        <nui-icon icon="mdi:arrow-down" />
      </button>
    </div>
    <NucHomeModuleBoard />
  </section>
</template>

<script setup lang="ts">
import { NUC_HOME_COPY } from '../../constants/content'
import { scrollHomeSection } from '../../utils/observe_active_section'
import NucHomeModuleBoard from '../core/module_board.vue'

const copy = NUC_HOME_COPY

function onCta(): void {
  const root = document.querySelector<HTMLElement>('.nuc-home')
  if (!root) return
  scrollHomeSection(root, 'contact')
}
</script>

<style lang="scss" scoped>
@import 'index';
</style>
