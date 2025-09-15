<template>
  <section id="access">
    <div class="access-container">
      <ad-heading
        :tag="2"
        class="access-header split"
        text="Access your data everywhere"
      />
      <div class="access-card-container">
        <dm-flip-card
          v-for="accessCard in accessCards"
          :front-image="imgUrl + accessCard.frontImage"
          :front-image-alt="accessCard.frontImageAlt"
          :front-image-width="accessCard.frontImageWidth"
          :front-image-height="accessCard.frontImageHeight"
          :front-title="accessCard.frontTitle"
          :back-content="accessCard.backContent"
          :back-content-class="accessCard.backContentClass"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { bounceFadeIn, useScrollTrigger, useSplitText } from 'atomic'

import { accessCards } from '.'

useSplitText().animate('.access-header', 500, 0.2, 0.1)

useScrollTrigger(
  '.access-card-container',
  () => {
    bounceFadeIn('.access-card-container .flip-card', {
      delay: 0,
      duration: 0.3,
      stagger: 0.3,
      ease: 'power2.out',
    })
  },
  {
    start: 'top 80%',
  }
)
</script>
