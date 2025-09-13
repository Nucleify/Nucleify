<template>
  <div class="nav-links-container">
    <template v-for="link in navLinks" :key="link.label">
      <nuxt-link v-if="!link.isButton" class="nav-link" :to="link.href">
        {{ link.label }}
      </nuxt-link>
      <nuxt-link v-else :to="link.href" :class="link.class">
        {{ link.label }}
      </nuxt-link>
    </template>
  </div>
</template>

<script setup lang="ts">
import { bounceFadeIn, isMobile } from 'atomic'

onMounted(() => {
  if (isMobile()) {
    bounceFadeIn('.nav-links-container .nav-link', {
      delay: 0.2,
      duration: 0.05,
      stagger: 0.15,
    })
    bounceFadeIn('.nav-links-container .login-button', {
      delay: 1.5,
      duration: 0.2,
    })
  } else {
    bounceFadeIn('.nav-links-container .nav-link', {
      delay: 2.2,
      duration: 0.05,
      stagger: 0.15,
    })
    bounceFadeIn('.nav-links-container .login-button', {
      delay: 2.9,
      duration: 0.2,
    })
  }
})
const { t } = useI18n()
const localePath = useLocalePath()

const navLinks = computed(() =>
  ['home', 'services', 'about', 'blog', 'login'].map((key) => ({
    label: t(`links.${key}.label`),
    href: localePath({ name: key }),
    isButton: key === 'login',
    class: key === 'login' ? 'login-button' : undefined,
  }))
)
</script>
