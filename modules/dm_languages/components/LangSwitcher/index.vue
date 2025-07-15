<template>
  <div class="lang-switcher">
    <ad-image
      :src="languagesImgUrl + (locale === 'en' ? 'gb.svg' : 'pl.svg')"
      fetchpriority="high"
      alt="flag"
      @click="switchLanguage"
    />
  </div>
</template>

<script setup lang="ts">
import { useSwitchLanguage } from 'atomic'

const props = defineProps()

const { switchLanguage } = useSwitchLanguage()

const { locale } = useI18n()
</script>
