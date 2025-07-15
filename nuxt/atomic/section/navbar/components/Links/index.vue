<template>
  <div class="nav-links-container">
    <template v-for="link in navLinks" :key="link.label">
      <ad-anchor
        v-if="!link.isButton"
        class="nav-link"
        :href="link.href"
        :label="link.label"
      />
      <ad-button
        v-else
        :class="link.class"
        :label="link.label"
        @click="navigateTo(link.href)"
        text
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from 'atomic'

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
