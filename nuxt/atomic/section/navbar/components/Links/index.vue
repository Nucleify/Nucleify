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
import { navLinks } from '.'
</script>
