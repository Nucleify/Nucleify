<template>
  <div class="panel-container">
    <client-only v-if="isClient">
      <ad-card class="settings-main-card" :id="route.hash.replace('#', '')">
        <template #content>
          <dm-menu-tree />
          <div class="settings-main-card-content">
            <dm-settings-card-content />
          </div>
        </template>
      </ad-card>
    </client-only>
    <template v-else>
      <ad-card class="settings-main-card" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'

const route = useRoute()
</script>