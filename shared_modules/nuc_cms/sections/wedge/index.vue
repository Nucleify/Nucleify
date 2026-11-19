<template>
  <section
    ref="rootEl"
    :id="domId"
    class="nuc-section nuc-wedge nuc-panel"
    aria-labelledby="nuc-wedge-title"
  >
    <header class="nuc-wedge-head">
      <p class="nuc-eyebrow">{{ copy.wedgeEyebrow }}</p>
      <h2 id="nuc-wedge-title" class="nuc-title">
        {{ copy.wedgeTitle }}
      </h2>
      <p class="nuc-support">{{ copy.wedgeSupport }}</p>
    </header>

    <ol class="nuc-wedge-grid" aria-label="Growth stages">
      <li
        v-for="(item, index) in wedge"
        :key="item.phase"
        class="nuc-wedge-card"
        :style="{ '--step-i': index }"
      >
        <div class="nuc-wedge-card-top">
          <span class="nuc-wedge-icon" aria-hidden="true">
            <nui-icon :icon="item.icon" mode="svg" />
          </span>
          <p class="nuc-wedge-phase">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            {{ item.phase }}
          </p>
        </div>
        <h3>{{ item.title }}</h3>
        <p class="nuc-wedge-body">{{ item.body }}</p>
        <p class="nuc-wedge-signal">{{ item.signal }}</p>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import {
  coalesceArray,
  NUC_INVESTOR_WEDGE,
  useCmsAttrs,
  useFrameSectionReveal,
  useInvestorCmsCopy,
  useSectionDomId,
  wedgeReveal,
} from '@shared_modules'

defineOptions({ inheritAttrs: false })

const rootEl = ref<HTMLElement | null>(null)
useFrameSectionReveal(rootEl, wedgeReveal)

const cms = useCmsAttrs()
const domId = useSectionDomId('wedge')
const copy = useInvestorCmsCopy()
const wedge = coalesceArray(
  cms.items,
  NUC_INVESTOR_WEDGE
) as typeof NUC_INVESTOR_WEDGE
</script>

<style lang="scss" scoped>
@import 'index';
</style>
