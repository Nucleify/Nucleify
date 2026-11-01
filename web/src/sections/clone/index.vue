<template>
  <section
    ref="rootEl"
    id="clone"
    class="nuc-section nuc-clone nuc-panel"
    aria-labelledby="nuc-clone-title"
  >
    <div class="nuc-clone-copy">
      <p class="nuc-eyebrow">{{ copy.cloneEyebrow }}</p>
      <h2 id="nuc-clone-title" class="nuc-title nuc-clone-title">
        <span class="nuc-clone-title-line">{{ copy.cloneTitleLead }}</span>
        <span class="nuc-clone-title-line is-nowrap"
          >{{ copy.cloneTitleTrail }}</span
        >
      </h2>
      <p class="nuc-support">{{ copy.cloneSupport }}</p>
      <div class="nuc-clone-actions">
        <nui-button
          :label="copy.cloneCta"
          variant="primary"
          icon="mdi:book-open-page-variant-outline"
          icon-pos="right"
          @click="goDocs"
        />
        <button type="button" class="nuc-next" @click="goStart">
          <span>{{ copy.cloneCtaNext }}</span>
          <nui-icon icon="mdi:arrow-down" />
        </button>
      </div>
    </div>

    <ol class="nuc-clone-term" :aria-label="copy.heroInstallLabel">
      <li v-for="(step, index) in install" :key="step">
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <code><em>$</em>{{ step }}</code>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed, ref } from 'vue'

import {
  cmsHomeInstallSteps,
  homeDocsHref,
  scrollSection,
  useCmsAttrs,
  useHomeCmsCopy,
  useShellSectionReveal,
} from '@web'
import { cloneReveal } from './motion'

defineOptions({ inheritAttrs: false })

const rootEl = ref<HTMLElement | null>(null)
useShellSectionReveal(rootEl, cloneReveal)

const cms = useCmsAttrs()
const copy = useHomeCmsCopy()
const install = computed(() => cmsHomeInstallSteps(cms))
const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')

function goDocs(): void {
  window.location.assign(homeDocsHref(lang.value, 'install'))
}

function goStart(): void {
  const root = document.querySelector<HTMLElement>('.nuc-shell')
  if (!root) return
  scrollSection(root, 'stack')
}
</script>

<style lang="scss" scoped>
@import 'index';
</style>
