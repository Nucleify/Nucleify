<template>
  <section
    id="clone"
    class="nuc-home-section nuc-home-clone nuc-home-panel"
    aria-labelledby="nuc-home-clone-title"
  >
    <div class="nuc-home-clone-copy">
      <p class="nuc-home-eyebrow">{{ copy.cloneEyebrow }}</p>
      <h2 id="nuc-home-clone-title" class="nuc-home-title">
        {{ copy.cloneTitle }}
      </h2>
      <p class="nuc-home-support">{{ copy.cloneSupport }}</p>
      <div class="nuc-home-clone-actions">
        <nui-button
          :label="copy.cloneCta"
          variant="primary"
          icon="mdi:book-open-page-variant-outline"
          icon-pos="right"
          @click="goDocs"
        />
        <button type="button" class="nuc-home-next" @click="goStart">
          <span>{{ copy.cloneCtaNext }}</span>
          <nui-icon icon="mdi:arrow-down" />
        </button>
      </div>
    </div>

    <ol class="nuc-home-clone-term" :aria-label="copy.heroInstallLabel">
      <li v-for="(step, index) in install" :key="step">
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <code><em>$</em>{{ step }}</code>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed } from 'vue'

import {
  homeDocsHref,
  NUC_HOME_COPY,
  NUC_HOME_INSTALL_STEPS,
} from '../../constants/content'
import { scrollHomeSection } from '../../utils/observe_active_section'

const copy = NUC_HOME_COPY
const install = NUC_HOME_INSTALL_STEPS
const route = useRoute()
const lang = computed(() => (route.params.lang as string) || 'en')

function goDocs(): void {
  window.location.assign(homeDocsHref(lang.value, 'install'))
}

function goStart(): void {
  const root = document.querySelector<HTMLElement>('.nuc-home')
  if (!root) return
  scrollHomeSection(root, 'stack')
}
</script>

<style lang="scss" scoped>
@import 'index';
</style>
