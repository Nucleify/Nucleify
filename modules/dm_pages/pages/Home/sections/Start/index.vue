<template>
  <section id="start">
    <div class="container">
      <div class="container start-container">
        <dm-animation-bounce />
        <div class="left-side">
          <ad-heading :tag="1" class="header">
            {{ t('home.start.title.text1') }} 
            <span class="shiny first-text">{{ t('home.start.title.highlight1') }}</span>
            <br/>
             {{ t('home.start.title.text2') }} <span class="shiny">{{ t('home.start.title.highlight2') }}</span>
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
              @click="navigateTo(localePath('/register'))"
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { navigateTo } from 'atomic'

const { t } = useI18n()
const localePath = useLocalePath()
</script>