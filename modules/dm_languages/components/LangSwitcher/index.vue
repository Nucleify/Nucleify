<template>
  <div 
    class="lang-switcher" 
    :class="{ 'mobile-img': props.isMobile }"
  >
    <ad-image
      :src="languagesImgUrl + (locale === 'en' ? 'gb.svg' : 'pl.svg')"
      fetchpriority="high"  
      alt="flag"
      @click="switchLanguage"
    />
  </div>
</template>
<script setup lang="ts">
  const props = defineProps<{
    isMobile?: boolean
  }>()

  const { locale, setLocale } = useI18n()
  const router = useRouter()
  const switchLocalePath = useSwitchLocalePath()

  const switchLanguage = async () => {
    const next = locale.value === 'en' ? 'pl' : 'en'
    await setLocale(next)
    router.replace(switchLocalePath(next))
  }
</script>