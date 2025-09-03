<template>
  <client-only>
    <div class="panel-container">
      <ad-card class="settings-main-card" :id="route.hash.replace('#', '')">
        <template #content>
          <dm-menu-tree />
          <div class="settings-main-card-content">
            <dm-settings-card-content />
          </div>
        </template>
      </ad-card>
    </div>
  </client-only>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app'

const route = useRoute()
</script>