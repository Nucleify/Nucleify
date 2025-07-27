<template>
  <ad-card class="settings-card settings-small-card">
    <template #header>
      <div class="settings-card-header-container">
        <ad-heading :tag="4" text="Colors" />

        <ad-button
          icon="prime:refresh"
          ad-type="main"
          class="refresh-button"
          rounded
          text
          @click="resetColorsToDefault"
        />
      </div>
    </template>
    <template #content>
      <ul class="settings-card-item-list">
        <li v-for="item in colorList" :key="item" class="settings-card-item">
          <ad-label :label="item" :for="item" />
          <ad-color-picker :ad-type="item.toLowerCase()" />
        </li>
      </ul>
    </template>
  </ad-card>
</template>

<script setup lang="ts">
import { colorList, resetColorsToDefault } from 'atomic'
</script>
