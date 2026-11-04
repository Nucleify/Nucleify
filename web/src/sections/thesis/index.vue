<template>
  <section
    ref="rootEl"
    id="thesis"
    class="nuc-section nuc-thesis nuc-panel"
    aria-labelledby="nuc-thesis-title"
  >
    <div class="nuc-thesis-head">
      <div class="nuc-thesis-pitch">
        <p class="nuc-eyebrow">{{ copy.thesisEyebrow }}</p>
        <h2 id="nuc-thesis-title" class="nuc-title">
          {{ copy.thesisTitle }}
        </h2>
        <p class="nuc-support">{{ copy.thesisSupport }}</p>
        <button type="button" class="nuc-next nuc-thesis-cta" @click="go">
          <span>{{ copy.thesisCta }}</span>
          <nui-icon icon="mdi:arrow-down" mode="svg" />
        </button>
      </div>

      <figure class="nuc-thesis-viz">
        <div class="nuc-thesis-viz-chart">
          <svg viewBox="0 0 100 100" role="img" :aria-label="shareLabel">
            <path
              v-for="arc in arcs"
              :key="arc.id"
              class="nuc-thesis-viz-slice"
              :d="arc.d"
              :fill="arc.color"
              :stroke="arc.color"
            />
          </svg>
          <div class="nuc-thesis-viz-hole">
            <strong>{{ shellCount }}</strong>
            <span>shells</span>
          </div>
        </div>
        <figcaption class="nuc-thesis-viz-legend">
          <p><em>1</em> shared nucleus</p>
          <ul>
            <li v-for="shell in shells" :key="shell.id">
              <i :style="{ '--c': shell.color }" aria-hidden="true" />
              <span>{{ shell.label }}</span>
            </li>
          </ul>
        </figcaption>
      </figure>
    </div>

    <div class="nuc-thesis-grid">
      <article v-for="item in thesis" :key="item.index" class="nuc-thesis-card">
        <div class="nuc-thesis-card-top">
          <span class="nuc-thesis-icon" aria-hidden="true">
            <nui-icon :icon="item.icon" mode="svg" />
          </span>
          <span class="nuc-thesis-index">{{ item.index }}</span>
        </div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.body }}</p>
        <div class="nuc-thesis-foot">
          <p class="nuc-thesis-outcome">{{ item.outcome }}</p>
          <p class="nuc-thesis-proof">{{ item.proof }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useShellSectionReveal } from '@web'
import { thesisReveal } from './motion'

const rootEl = ref<HTMLElement | null>(null)
useShellSectionReveal(rootEl, thesisReveal)

import {
  NUC_INVESTOR_SHELLS,
  NUC_INVESTOR_THESIS,
  nucInvestorShellArcs,
  scrollSection,
  useInvestorCmsCopy,
} from '@web'

defineOptions({ inheritAttrs: false })

const copy = useInvestorCmsCopy()
const thesis = NUC_INVESTOR_THESIS
const shells = NUC_INVESTOR_SHELLS
const shellCount = shells.length
const arcs = nucInvestorShellArcs()
const shareLabel = `Seven shells from one nucleus: ${shells
  .map((s) => s.label)
  .join(', ')}`

function go(): void {
  const root = document.querySelector<HTMLElement>('.nuc-shell')
  if (!root) return
  scrollSection(root, 'savings')
}
</script>

<style lang="scss" scoped>
@import 'index';
</style>
