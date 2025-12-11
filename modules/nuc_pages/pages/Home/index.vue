<template>
  <div class="home-container">
    <nuc-start />
    <nuc-features />
    <nuc-innovations />
    <nuc-section-why-us site="home" />
    <nuc-section-faq site="home" />
    <nuc-section-contact />
  </div>
</template>

<script setup lang="ts">
import { bounceFadeIn, useScrollTrigger, useSplitText } from 'atomic'

import { NucFeatures, NucInnovations, NucStart } from './sections'

onBeforeMount(() => window.scrollTo(0, 0))

useSplitText().animate(
  '.faq-section-header',
  500,
  0.2,
  0.1,
  'power2.out',
  true,
  'top 60%'
)

useScrollTrigger(
  '.faq-section-header',
  () => {
    bounceFadeIn('.faq-section .p-accordionpanel', {
      duration: 0.3,
      ease: 'power2.out',
      stagger: 0.1,
    })
  },
  {
    start: 'top 40%',
  }
)
</script>
