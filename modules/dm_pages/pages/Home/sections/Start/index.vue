<template>
  <section id="start">
    <div class="container">
      <div class="container start-container">
        <dm-animation-bounce class="start-bounce-animation" />
        <div class="left-side">
          <ad-heading :tag="1" class="header">
            {{ t('home.start.title.text1') }}
            <span class="shiny first-text">
              {{ t('home.start.title.highlight1') }}
            </span>
            <br />
            {{ t('home.start.title.text2') }}
            <span class="shiny">{{ t('home.start.title.highlight2') }}</span>
          </ad-heading>

          <ad-heading
            :tag="2"
            :text="t('home.start.subtitle')"
            class="start-description"
          />

          <div class="cta">
            <ad-button
              :label="t('home.start.tryButton')"
              class="start-button caterpillar"
              @click="navigateTo(localePath('register'))"
            />
            <ad-button
              label="GitHub"
              alt="GitHub logo"
              :src="technologiesImgUrl + 'github.svg'"
              class="start-button caterpillar"
              @click="navigateTo('https://github.com/SzymCode/DataManager')"
            />
          </div>
        </div>
      </div>
      <a 
        href="https://github.com/Atomic-IT/DataManager/milestone/8" 
        target="_blank"
      >
        <dm-time-countdown 
          class="v1-release-countdown"
          :date="new Date('2026-01-01')" 
        />
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap'

import {
  bounceFadeIn,
  navigateTo,
  useScrollTrigger,
  useSplitText,
} from 'atomic'

const { t } = useI18n()
const localePath = useLocalePath()

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
    start: 'top 65%',
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
