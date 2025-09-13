<template>
  <div id="contact">
    <div class="contact-content container">
      <ad-paragraph
        :text="t('home.contact.title')"
        class="contact-content-title"
      />
      <ad-paragraph
        :text="t('home.contact.description')"
        class="contact-content-description"
      />
      <ad-button
        class="contact-content-button caterpillar"
        label="Mail"
        @click="navigateTo('mailto:business@atomic-it.org')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  bounceFadeIn,
  navigateTo,
  useScrollTrigger,
  useSplitText,
} from 'atomic'

const { t } = useI18n()

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
      delay: 1.1,
      duration: 0.15,
    })
  },
  {
    start: 'top 20%',
  }
)
</script>
