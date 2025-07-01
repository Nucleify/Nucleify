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
import { useI18n } from 'vue-i18n'
import { navLinks as rawLinks } from '.'

const { t } = useI18n()
const localePath = useLocalePath()

const navLinks = (['home', 'services', 'about', 'blog', 'login']).map(key => ({
  label: t('links.' + key + '.label'),
  href: localePath(t('links.' + key + '.href')),
  isButton: key === 'login',
  class: key === 'login' ? 'login-button' : undefined
}))
</script>