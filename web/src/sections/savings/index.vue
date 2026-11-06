<template>
  <section
    ref="rootEl"
    id="savings"
    class="nuc-section nuc-savings nuc-panel"
    aria-labelledby="nuc-savings-title"
  >
    <header class="nuc-savings-head">
      <p class="nuc-eyebrow">{{ copy.savingsEyebrow }}</p>
      <h2 id="nuc-savings-title" class="nuc-title">
        {{ copy.savingsTitle }}
      </h2>
      <p class="nuc-support">{{ copy.savingsSupport }}</p>
      <button type="button" class="nuc-next nuc-savings-cta" @click="go">
        <span>{{ copy.savingsCta }}</span>
        <nui-icon icon="mdi:arrow-down" mode="svg" />
      </button>
    </header>

    <ul class="nuc-savings-grid" aria-label="What you keep">
      <li
        v-for="(item, index) in rail"
        :key="item.id"
        class="nuc-savings-card"
        :style="{ '--step-i': index }"
      >
        <div class="nuc-savings-card-top">
          <p class="nuc-savings-card-value">{{ item.value }}</p>
          <span class="nuc-savings-card-icon" aria-hidden="true">
            <nui-icon :icon="iconFor(item.id)" mode="svg" />
          </span>
        </div>
        <p class="nuc-savings-card-unit">{{ item.unit }}</p>
        <h3>{{ item.label }}</h3>
        <p class="nuc-savings-card-detail">{{ item.detail }}</p>
      </li>
    </ul>

    <p class="nuc-savings-note">{{ copy.savingsNote }}</p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useShellSectionReveal } from '@web'
import { savingsReveal } from './motion'

const rootEl = ref<HTMLElement | null>(null)
useShellSectionReveal(rootEl, savingsReveal)

import { NUC_INVESTOR_SAVINGS, scrollSection, useInvestorCmsCopy } from '@web'

defineOptions({ inheritAttrs: false })

const copy = useInvestorCmsCopy()
const rail = NUC_INVESTOR_SAVINGS

const FACT_ICONS: Record<(typeof NUC_INVESTOR_SAVINGS)[number]['id'], string> =
  {
    shells: 'mdi:layers-triple',
    runtime: 'mdi:file-code-outline',
    data: 'mdi:database-outline',
  }

function iconFor(id: (typeof NUC_INVESTOR_SAVINGS)[number]['id']): string {
  return FACT_ICONS[id]
}

function go(): void {
  const root = document.querySelector<HTMLElement>('.nuc-shell')
  if (!root) return
  scrollSection(root, 'wedge')
}
</script>

<style lang="scss" scoped>
@import 'index';
</style>
