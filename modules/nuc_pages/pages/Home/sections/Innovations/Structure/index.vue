<template>
  <section id="structure">
    <div class="structure-container">
      <div class="content">
        <div class="animation-container">
          <DeferredContent>
            <nuc-structure-animation />
          </DeferredContent>
        </div>
        <div class="description-container">
          <ad-heading :tag="3" class="title">
            <div class="shiny">Atomic Design&nbsp;</div>
            <span>Approach</span>
          </ad-heading>
          <ad-paragraph
            text="
              Utilizing Atomic Design principles to develop dynamic, modular solutions that enhance
              scalability and ensure seamless integration in your development processes.
            "
            class="description"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { bounceFadeIn, useScrollTrigger, useSplitText } from 'atomic'

import { NucStructureAnimation } from './'

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
