<template>
  <div class="nav-links-container">
    <template v-for="link in navLinks" :key="link.label">
      <molecule-anchor
        v-if="!link.isButton"
        class="nav-link"
        :href="link.href"
        :label="link.label"
      />
      <atom-button
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

import { navLinks } from '.'
</script>
