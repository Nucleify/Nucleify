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
            <span
              v-for="(ch, i) in brandChars"
              :key="`${ch}-${i}`"
              class="nuc-home-hero-brand-ch"
              :class="{ 'is-last': i === brandChars.length - 1 }"
              >{{ ch }}</span
            >
          </h1>
        </div>

        <p class="nuc-home-hero-headline">
          <span class="nuc-home-hero-headline-line"
            >{{ copy.headlineLead }}</span
          >
          <span class="nuc-home-hero-headline-line is-nowrap"
            >{{ copy.headlineTrail }}</span
          >
        </p>

        <p class="nuc-home-hero-support">
          {{ copy.support }}
        </p>

        <div class="nuc-home-hero-cta">
          <button
            type="button"
            class="nuc-home-btn is-primary"
            @click="onPrimary"
          >
            <nui-icon
              icon="mdi:book-open-page-variant-outline"
              class="nuc-home-btn-icon"
              mode="svg"
            />
            <span>{{ copy.ctaPrimary }}</span>
          </button>
          <button
            type="button"
            class="nuc-home-btn is-outlined"
            @click="onSecondary"
          >
            <nui-icon icon="mdi:github" class="nuc-home-btn-icon" mode="svg" />
            <span>{{ copy.ctaSecondary }}</span>
          </button>
          <button type="button" class="nuc-home-next" @click="onWhy">
            <span>{{ copy.ctaTertiary }}</span>
            <nui-icon
              icon="mdi:arrow-down"
              class="nuc-home-next-icon"
              mode="svg"
            />
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
const brandChars = [...copy.brand]
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
