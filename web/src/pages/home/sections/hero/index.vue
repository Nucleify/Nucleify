<template>
  <section
    id="intro"
    class="nuc-home-hero nuc-home-panel"
    aria-labelledby="nuc-home-brand"
  >
    <div class="nuc-home-hero-layout">
      <div class="nuc-home-hero-copy">
        <p class="nuc-home-hero-eyebrow">
          <span class="nuc-home-hero-live" aria-hidden="true" />
          {{ copy.heroEyebrow }}
        </p>

        <div class="nuc-home-hero-mark">
          <h1 id="nuc-home-brand" class="nuc-home-hero-brand">
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
            icon="mdi:book-open-page-variant-outline"
            icon-pos="right"
            @click="onPrimary"
          />
          <nui-button
            :label="copy.ctaSecondary"
            variant="outlined"
            icon="mdi:github"
            @click="onSecondary"
          />
          <button type="button" class="nuc-home-next" @click="onWhy">
            <span>{{ copy.ctaTertiary }}</span>
            <nui-icon icon="mdi:arrow-down" />
          </button>
        </div>

        <ul class="nuc-home-hero-proof" aria-label="Highlights">
          <li v-for="item in proof" :key="item">{{ item }}</li>
        </ul>
      </div>

      <aside class="nuc-home-hero-panel is-slice" aria-label="Module slice">
        <NucHomeModuleBoard />
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed } from 'vue'

import {
  homeDocsHref,
  NUC_HOME_COPY,
  NUC_HOME_HERO_PROOF,
} from '../../constants/content'
import { scrollHomeSection } from '../../utils/observe_active_section'
import NucHomeModuleBoard from '../core/module_board.vue'

const copy = NUC_HOME_COPY
const proof = NUC_HOME_HERO_PROOF
const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')

function onPrimary(): void {
  window.location.assign(homeDocsHref(lang.value, 'intro'))
}

function onSecondary(): void {
  window.open(copy.githubHref, '_blank', 'noopener,noreferrer')
}

function onWhy(): void {
  const root = document.querySelector<HTMLElement>('.nuc-home')
  if (!root) return
  scrollHomeSection(root, 'architecture')
}
</script>

<style lang="scss" scoped>
@import 'index';
</style>
