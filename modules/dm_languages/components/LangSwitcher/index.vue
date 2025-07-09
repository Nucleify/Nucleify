<template>
  <div class="lang-switcher" :class="{ 'mobile-img': props.isMobile }">
    <ad-image
      :src="languagesImgUrl + (locale === 'en' ? 'gb.svg' : 'pl.svg')"
      fetchpriority="high"
      alt="flag"
      @click="switchLanguage"
    />
  </div>
</template>

<script setup lang="ts">
import { LangSwitcherInterface } from '.'
import { useSwitchLanguage } from 'atomic'

const props = defineProps<LangSwitcherInterface>()

const { switchLanguage } = useSwitchLanguage()

const { locale } = useI18n()
</script>
