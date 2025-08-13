<template>
  <section id="structure">
    <div class="structure-container">
      <div class="content">
        <div class="animation-container">
          <DeferredContent>
            <StructureAnimation />
          </DeferredContent>
        </div>
        <div class="description-container">
          <ad-heading :tag="3" class="title">
            <template v-if="locale === 'pl'">
              <span>{{ t('home.structure.title.text') }}</span>
              <div class="shiny">{{ t('home.structure.title.highlight') }}</div>
            </template>
            <template v-else>
              <div class="shiny">{{ t('home.structure.title.highlight') }}</div>
              <span>{{ t('home.structure.title.text') }}</span>
            </template>
          </ad-heading>
          <ad-paragraph
            :text="t('home.structure.description')"
            class="description"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { bounceFadeIn, useScrollTrigger, useSplitText } from 'atomic'

import { StructureAnimation } from './'

const { t, locale } = useI18n()

const { animate } = useSplitText()

animate(
  '.description-container .title',
  0,
  0.3,
  0.15,
  'power2.out',
  true,
  'top 70%'
)
animate(
  '.description-container .description',
  0.15,
  0.3,
  0.075,
  'power2.out',
  true,
  'top 70%'
)

useScrollTrigger(
  '.structure-container',
  () => {
    bounceFadeIn('.animation-container', {
      delay: 0,
      duration: 0.3,
      ease: 'power2',
    })
  },
  {
    start: 'top 70%',
  }
)
</script>
