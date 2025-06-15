<template>
  <div class="nav-links-container">
    <template v-for="link in navLinks" :key="link.label">
      <nuxt-link v-if="!link.isButton" class="nav-link" :to="link.href">
        {{ link.label }}
      </nuxt-link>
      <ad-button
        v-else
        :class="link.class"
        :label="link.label"
        text
        @click="navigateTo(link.href)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from 'atomic'

import { navLinks } from '.'
</script>
