<template>
  <div class="panel-container">
    <ad-card class="settings-main-card" :id="route.hash.replace('#', '')">
      <template #content>
        <dm-menu-tree />
        <div class="settings-main-card-content">
          <template v-if="route.hash === '#theme'">
            <dm-color-settings-card />
            <dm-settings-chart-card />
          </template>
        </div>
      </template>
    </ad-card>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'

const route = useRoute()
</script>