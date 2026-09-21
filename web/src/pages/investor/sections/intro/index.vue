<template>
  <section
    id="intro"
    class="nuc-home-hero nuc-home-panel"
    aria-labelledby="nuc-investor-brand"
  >
    <div class="nuc-home-hero-layout">
      <div class="nuc-home-hero-copy">
        <p class="nuc-home-hero-eyebrow">
          <span class="nuc-home-hero-live" aria-hidden="true" />
          {{ copy.heroEyebrow }}
        </p>

        <div class="nuc-home-hero-mark">
          <h1 id="nuc-investor-brand" class="nuc-home-hero-brand">
            {{ copy.brand }}
          </h1>
        </div>

        <p class="nuc-home-hero-headline">
          {{ copy.headline }}
        </p>

        <p class="nuc-home-hero-support">
          {{ copy.support }}
        </p>

        <div class="nuc-home-hero-cta">
          <nui-button
            :label="copy.ctaPrimary"
            variant="primary"
            icon="mdi:email-outline"
            icon-pos="right"
            @click="onPrimary"
          />
          <nui-button
            :label="copy.ctaSecondary"
            variant="outlined"
            icon="mdi:rocket-launch-outline"
            @click="onSecondary"
          />
          <button type="button" class="nuc-home-next" @click="onThesis">
            <span>{{ copy.ctaTertiary }}</span>
            <nui-icon icon="mdi:arrow-down" />
          </button>
        </div>

        <ul class="nuc-home-hero-proof" aria-label="Highlights">
          <li v-for="item in proof" :key="item">{{ item }}</li>
        </ul>
      </div>

      <aside
        class="nuc-home-hero-panel is-deal"
        aria-label="Investment thesis snapshot"
      >
        <div class="nuc-inv-emit" role="img" :aria-label="emitLabel">
          <p class="nuc-inv-emit-source">
            <span>{{ deal.source }}</span>
            <code>{{ deal.sourceFile }}</code>
          </p>

          <div class="nuc-inv-emit-stem" aria-hidden="true" />

          <ul class="nuc-inv-emit-field" aria-hidden="true">
            <li
              v-for="shell in shells"
              :key="shell.id"
              class="nuc-inv-emit-cube"
              :class="`is-${shell.id}`"
            >
              <span class="nuc-inv-emit-cube-mark">
                <nui-icon :icon="shell.icon" />
              </span>
              <strong>{{ shell.label }}</strong>
            </li>
          </ul>

          <div class="nuc-inv-emit-stamp">
            <p class="nuc-inv-emit-figure">
              <span>{{ deal.figureLead }}</span>
              <span>{{ deal.figureTrail }}</span>
            </p>
            <p class="nuc-inv-emit-unit">{{ deal.unit }}</p>
            <p class="nuc-inv-emit-caption">{{ deal.caption }}</p>
            <p class="nuc-inv-emit-note">{{ deal.note }}</p>
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed } from 'vue'

import {
  investorHomeHref,
  NUC_INVESTOR_COPY,
  NUC_INVESTOR_DEAL,
  NUC_INVESTOR_PROOF,
  NUC_INVESTOR_SURFACE,
} from '../../constants/content'
import { scrollHomeSection } from '../../../home/utils/observe_active_section'

const copy = NUC_INVESTOR_COPY
const proof = NUC_INVESTOR_PROOF
const deal = NUC_INVESTOR_DEAL
const shells = NUC_INVESTOR_SURFACE
const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')
const shellNames = shells.map((shell) => shell.label).join(', ')
const emitLabel = [
  `${deal.source} ${deal.sourceFile} emits ${shellNames}.`,
  `${deal.figure} ${deal.unit}.`,
  `${deal.caption}.`,
].join(' ')

function onPrimary(): void {
  const root = document.querySelector<HTMLElement>('.nuc-investor')
  if (!root) return
  scrollHomeSection(root, 'ask')
}

function onSecondary(): void {
  window.location.assign(investorHomeHref(lang.value))
}

function onThesis(): void {
  const root = document.querySelector<HTMLElement>('.nuc-investor')
  if (!root) return
  scrollHomeSection(root, 'thesis')
}
</script>
