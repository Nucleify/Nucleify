<template>
  <div id="contact">
    <div class="contact-content container">
      <ad-paragraph class="contact-content-title">
        <span>Contact</span>&nbsp;
        <span>Us</span>
      </ad-paragraph>

      <ad-paragraph
        text="
          If you have any questions, need assistance, or would like to learn more
          about our project, don’t hesitate to reach out. We’re here to help!
        "
        class="contact-content-description"
      />
      <ad-button
        class="contact-content-button caterpillar"
        label="Mail"
        @click="navigateToUrl('mailto:business@atomic-it.org')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  bounceFadeIn,
  navigateToUrl,
  useScrollTrigger,
  useSplitText,
} from 'atomic'

useSplitText().animate(
  '.contact-content-title',
  500,
  0.2,
  0.1,
  'power2.out',
  true,
  'top 60%'
)
useSplitText().animate(
  '.contact-content-description',
  500,
  0.3,
  0.05,
  'power2.out',
  true,
  'top 70%'
)

useScrollTrigger(
  '.contact-content-description',
  () => {
    bounceFadeIn('.contact-content-button', {
      delay: 0.5,
      duration: 0.15,
    })
  },
  {
    start: 'top 20%',
  }
)
</script>
