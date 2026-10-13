<template>
  <section
    id="thesis"
    class="nuc-home-section nuc-inv-why nuc-home-panel"
    aria-labelledby="nuc-investor-thesis-title"
  >
    <div class="nuc-inv-why-head">
      <div class="nuc-inv-why-pitch">
        <p class="nuc-home-eyebrow">{{ copy.thesisEyebrow }}</p>
        <h2 id="nuc-investor-thesis-title" class="nuc-home-title">
          {{ copy.thesisTitle }}
        </h2>
        <p class="nuc-home-support">{{ copy.thesisSupport }}</p>
        <button type="button" class="nuc-home-next nuc-inv-why-cta" @click="go">
          <span>{{ copy.thesisCta }}</span>
          <nui-icon icon="mdi:arrow-down" mode="svg" />
        </button>
      </div>

      <figure class="nuc-inv-why-viz">
        <div class="nuc-inv-why-viz-chart">
          <svg viewBox="0 0 100 100" role="img" :aria-label="shareLabel">
            <path
              v-for="arc in arcs"
              :key="arc.id"
              class="nuc-inv-why-viz-slice"
              :d="arc.d"
              :fill="arc.color"
              :stroke="arc.color"
            />
          </svg>
          <div class="nuc-inv-why-viz-hole">
            <strong>{{ shellCount }}</strong>
            <span>shells</span>
          </div>
        </div>
        <figcaption class="nuc-inv-why-viz-legend">
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

    <div class="nuc-inv-why-grid">
      <article
        v-for="item in thesis"
        :key="item.index"
        class="nuc-inv-why-card"
      >
        <div class="nuc-inv-why-card-top">
          <span class="nuc-inv-why-icon" aria-hidden="true">
            <nui-icon :icon="item.icon" mode="svg" />
          </span>
          <span class="nuc-inv-why-index">{{ item.index }}</span>
        </div>
        <h3>{{ item.title }}</h3>
        <p>{{ item.body }}</p>
        <div class="nuc-inv-why-foot">
          <p class="nuc-inv-why-outcome">{{ item.outcome }}</p>
          <p class="nuc-inv-why-proof">{{ item.proof }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  NUC_INVESTOR_COPY,
  NUC_INVESTOR_SHELLS,
  NUC_INVESTOR_THESIS,
  nucInvestorShellArcs,
} from '../../constants/content'
import { scrollHomeSection } from '../../../home/utils/observe_active_section'

const copy = NUC_INVESTOR_COPY
const thesis = NUC_INVESTOR_THESIS
const shells = NUC_INVESTOR_SHELLS
const shellCount = shells.length
const arcs = nucInvestorShellArcs()
const shareLabel = `Seven shells from one nucleus: ${shells
  .map((s) => s.label)
  .join(', ')}`

function go(): void {
  const root = document.querySelector<HTMLElement>('.nuc-investor')
  if (!root) return
  scrollHomeSection(root, 'savings')
}
</script>
