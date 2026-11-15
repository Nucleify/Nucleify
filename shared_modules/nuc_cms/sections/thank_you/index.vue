<template>
  <section
    :id="domId"
    class="nuc-section nuc-thank-you nuc-panel"
    aria-label="Thank you"
  >
    <div class="nuc-thank-you-inner">
      <div class="nuc-thank-you-layout">
        <aside
          v-if="showAnyCube"
          class="nuc-thank-you-cube"
          :class="cubeClasses"
          aria-label="Nucleify nucleus"
        >
          <NucHoloCube
            :focus="focusId"
            :faces="faces"
            :paused="paused"
            @focus="onFocus"
          />
        </aside>

        <div class="nuc-thank-you-copy">
          <h1 class="nuc-thank-you-title" :aria-label="copy.thankYouTitle">
            {{ copy.thankYouTitle }}
          </h1>
          <p class="nuc-thank-you-support">{{ copy.thankYouSupport }}</p>

          <div class="nuc-thank-you-cta">
            <a :href="homeHref(lang)" class="nuc-btn is-primary">
              <nui-icon icon="mdi:arrow-left" class="nuc-btn-icon" mode="svg" />
              <span>{{ copy.thankYouCta }}</span>
            </a>
            <a :href="homeInvestorHref(lang)" class="nuc-btn is-outlined">
              <nui-icon
                icon="mdi:chart-timeline-variant"
                class="nuc-btn-icon"
                mode="svg"
              />
              <span>{{ copy.thankYouInvestCta }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'
import { computed } from 'vue'

import {
  homeHref,
  homeInvestorHref,
  holoCubeFaces,
  THANK_YOU_SECTION_DEFAULTS,
  useCmsAttrs,
  useCubeVisibility,
  useHoloCubeFocus,
  useHomeCmsCopy,
  useSectionDomId,
} from '@shared_modules'
import NucHoloCube from '@shared_modules/nuc_cms/parts/holo_cube/index.vue'

defineOptions({ inheritAttrs: false })

const cms = useCmsAttrs()
const domId = useSectionDomId('thanks')
const copy = useHomeCmsCopy()
const route = useRoute()
const lang = computed(() => String(route.params.lang || 'en'))

const { showAnyCube, cubeClasses } = useCubeVisibility(
  () => cms.showCube,
  THANK_YOU_SECTION_DEFAULTS['section.thank_you'].showCube
)

const faces = computed(() =>
  holoCubeFaces({
    ui: copy.value.coreLaneUi,
    sdk: copy.value.coreLaneSdk,
    data: copy.value.coreLaneData,
  })
)

const { focusId, paused, onFocus } = useHoloCubeFocus({ intervalMs: 4200 })
</script>

<style lang="scss">
@import 'index';
</style>
