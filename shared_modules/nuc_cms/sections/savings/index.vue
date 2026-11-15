<template>
  <section
    ref="rootEl"
    :id="domId"
    class="nuc-section nuc-savings nuc-panel"
    aria-labelledby="nuc-savings-title"
  >
    <header class="nuc-savings-head">
      <p class="nuc-eyebrow">{{ copy.savingsEyebrow }}</p>
      <h2 id="nuc-savings-title" class="nuc-title">
        {{ copy.savingsTitle }}
      </h2>
      <p v-if="support" class="nuc-support">{{ support }}</p>
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
import { computed, ref } from 'vue'

import {
  coalesceArray,
  NUC_INVESTOR_SAVINGS,
  savingsReveal,
  scrollFrameTo,
  useCmsAttrs,
  useFrameSectionReveal,
  useInvestorCmsCopy,
  useSectionDomId,
} from '@shared_modules'

defineOptions({ inheritAttrs: false })

const rootEl = ref<HTMLElement | null>(null)
useFrameSectionReveal(rootEl, savingsReveal)

const cms = useCmsAttrs()
const domId = useSectionDomId('savings')
const copy = useInvestorCmsCopy()
const support = computed(() =>
  typeof cms.savingsSupport === 'string'
    ? cms.savingsSupport
    : copy.value.savingsSupport
)
const rail = coalesceArray(
  cms.items,
  NUC_INVESTOR_SAVINGS
) as (typeof NUC_INVESTOR_SAVINGS)[number][]

const FACT_ICONS: Record<string, string> = {
  shells: 'mdi:layers-triple',
  runtime: 'mdi:file-code-outline',
  data: 'mdi:database-outline',
}

function iconFor(id: string): string {
  return FACT_ICONS[id] ?? 'mdi:circle-outline'
}

function go(): void {
  scrollFrameTo('wedge')
}
</script>

<style lang="scss" scoped>
@import 'index';
</style>
