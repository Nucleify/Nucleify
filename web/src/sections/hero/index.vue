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
          <a
            class="nuc-btn is-primary main-cta"
            :href="cliHref"
            target="_blank"
            rel="noopener noreferrer"
          >
            <nui-icon
              icon="mdi:console"
              class="nuc-btn-icon"
              width="16px"
              height="16px"
              mode="svg"
            />
            <span>{{ copy.ctaPrimary }}</span>
          </a>
          <a
            class="nuc-btn is-outlined"
            :href="playHref"
            target="_blank"
            rel="noopener noreferrer"
          >
            <nui-icon
              icon="mdi:play-circle-outline"
              class="nuc-btn-icon"
              width="16px"
              height="16px"
              mode="svg"
            />
            <span>{{ copy.ctaSecondary }}</span>
          </a>
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
import { computed } from 'vue'

import {
  cmsHomeModules,
  homeCliHref,
  homePlayHref,
  NucHomeModuleBoard,
  useCmsAttrs,
  useHomeCmsCopy,
} from '@web'

defineOptions({ inheritAttrs: false })

const cms = useCmsAttrs()
const copy = useHomeCmsCopy()
const modules = computed(() => cmsHomeModules(cms))
const brandChars = computed(() => [...(copy.value.brand || 'Nucleify')])
const playHref = computed(() => copy.value.playgroundHref || homePlayHref())
const cliHref = computed(() => copy.value.cliHref || homeCliHref())
</script>

<style lang="scss" scoped>
@import 'index';
</style>
