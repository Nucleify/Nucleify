<template>
  <section id="intro" class="nuc-hero nuc-panel" aria-labelledby="nuc-brand">
    <div class="nuc-hero-layout">
      <div class="nuc-hero-copy">
        <p class="nuc-hero-eyebrow">
          <span class="nuc-hero-live" aria-hidden="true" />
          {{ copy.heroEyebrow }}
        </p>

        <div class="nuc-hero-mark">
          <h1 id="nuc-brand" class="nuc-hero-brand">
            <span
              v-for="(ch, i) in brandChars"
              :key="`${ch}-${i}`"
              class="nuc-hero-brand-ch"
              :class="{ 'is-last': i === brandChars.length - 1 }"
              >{{ ch }}</span
            >
          </h1>
        </div>

        <p class="nuc-hero-headline">
          <span class="nuc-hero-headline-line">{{ copy.headlineLead }}</span>
          <span class="nuc-hero-headline-line is-nowrap"
            >{{ copy.headlineTrail }}</span
          >
        </p>

        <p class="nuc-hero-support">
          {{ copy.support }}
        </p>

        <div class="nuc-hero-cta">
          <button type="button" class="nuc-btn is-primary" @click="onPrimary">
            <nui-icon
              icon="mdi:book-open-page-variant-outline"
              class="nuc-btn-icon"
              mode="svg"
            />
            <span>{{ copy.ctaPrimary }}</span>
          </button>
          <button
            type="button"
            class="nuc-btn is-outlined"
            @click="onSecondary"
          >
            <nui-icon icon="mdi:github" class="nuc-btn-icon" mode="svg" />
            <span>{{ copy.ctaSecondary }}</span>
          </button>
          <button type="button" class="nuc-next" @click="onWhy">
            <span>{{ copy.ctaTertiary }}</span>
            <nui-icon icon="mdi:arrow-down" class="nuc-next-icon" mode="svg" />
          </button>
        </div>
      </div>

      <aside class="nuc-hero-panel is-slice" aria-label="Module slice">
        <NucHomeModuleBoard
          :modules="modules"
          :core-inspect="copy.coreInspect"
          :core-live="copy.coreLive"
          :core-lane-sdk="copy.coreLaneSdk"
          :core-lane-data="copy.coreLaneData"
          :core-lane-ui="copy.coreLaneUi"
        />
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed } from 'vue'

import {
  cmsHomeModules,
  homeDocsHref,
  NucHomeModuleBoard,
  scrollSection,
  useCmsAttrs,
  useHomeCmsCopy,
} from '@web'

defineOptions({ inheritAttrs: false })

const cms = useCmsAttrs()
const copy = useHomeCmsCopy()
const modules = computed(() => cmsHomeModules(cms))
const brandChars = computed(() => [...(copy.value.brand || 'Nucleify')])
const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')

function onPrimary(): void {
  window.location.assign(homeDocsHref(lang.value, 'intro'))
}

function onSecondary(): void {
  window.open(copy.value.githubHref, '_blank', 'noopener,noreferrer')
}

function onWhy(): void {
  const root = document.querySelector<HTMLElement>('.nuc-shell')
  if (!root) return
  scrollSection(root, 'architecture')
}
</script>

<style lang="scss" scoped>
@import 'index';
</style>
