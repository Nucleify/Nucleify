<template>
  <section id="start">
   sadsadsdasadassadsda
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap'

import {
  bounceFadeIn,
  navigateToUrl,
  useScrollTrigger,
  useSplitText,
} from 'atomic'

useSplitText().animate('.start-container .header', 500, 0.2, 0.1)
useSplitText().animate('.start-container .start-description', 1000, 0.2, 0.1)

useScrollTrigger('.start-container', () => {
  bounceFadeIn('.cta .start-button:nth-of-type(1)', {
    delay: 2.2,
  })
  bounceFadeIn('.cta .start-button:nth-of-type(2)', {
    delay: 2.7,
  })
})

useScrollTrigger(
  '.v1-release-countdown',
  () => {
    bounceFadeIn('.v1-release-countdown', {
      delay: 0.3,
    })
  },
  {
    start: 'top 70%',
  }
)

onMounted(() => {
  gsap.to('.start-bounce-animation', {
    opacity: 1,
    duration: 0.3,
    ease: 'power2.out',
    delay: 1.2,
  })
})
</script>
