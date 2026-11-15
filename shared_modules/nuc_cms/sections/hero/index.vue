<template>
  <section :id="domId" class="nuc-hero nuc-panel" aria-labelledby="nuc-brand">
    <div class="nuc-hero-layout" :class="layoutClasses">
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

        <p class="nuc-hero-headline">{{ copy.headline }}</p>

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

      <aside
        v-if="showAnyPanel"
        class="nuc-hero-panel is-slice"
        :class="panelClasses"
        aria-label="Module slice"
      >
        <NucHomeModuleBoard
          :modules="modules"
          :core-inspect="copy.coreInspect"
          :core-live="copy.coreLive"
          :core-lane-sdk="copy.coreLaneSdk"
          :core-lane-data="copy.coreLaneData"
          :core-lane-ui="copy.coreLaneUi"
          :show-cube="showCube"
          :show-glance="showGlance"
        />
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import {
  cmsHomeModules,
  DEFAULT_SHOW_CUBE_HOME,
  DEFAULT_SHOW_GLANCE_HOME,
  homeCliHref,
  homePlayHref,
  useBreakpointPanel,
  useCmsAttrs,
  useHomeCmsCopy,
  useSectionDomId,
} from '@shared_modules'
import NucHomeModuleBoard from '@shared_modules/nuc_cms/parts/module_board/index.vue'

defineOptions({ inheritAttrs: false })

const cms = useCmsAttrs()
const domId = useSectionDomId('intro')
const copy = useHomeCmsCopy()
const modules = computed(() => cmsHomeModules(cms))
const brandChars = computed(() => [...(copy.value.brand || 'Nucleify')])
const playHref = computed(() => copy.value.playgroundHref || homePlayHref())
const cliHref = computed(() => copy.value.cliHref || homeCliHref())

const { showCube, showGlance, showAnyPanel, panelClasses, layoutClasses } =
  useBreakpointPanel(
    () => cms.showCube,
    () => cms.showGlance,
    DEFAULT_SHOW_CUBE_HOME,
    DEFAULT_SHOW_GLANCE_HOME
  )
</script>

<style lang="scss" scoped>
@import 'index';
</style>
