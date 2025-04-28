<template>
  <organism-card class="settings-card settings-small-card">
    <template #header>
      <div class="settings-card-header-container">
        <atom-heading :tag="4" text="Colors" />

        <atom-button
          icon="pi pi-refresh"
          ad-type="main"
          class="refresh-button"
          @click="setDefaultColors(false)"
          rounded
          text
        />
      </div>
    </template>
    <template #content>
      <ul class="settings-card-item-list">
        <li v-for="item in colorList" :key="item" class="settings-card-item">
          <atom-label :label="item" :for="item" />
          <organism-color-picker :ad-type="item.toLowerCase()" />
        </li>
      </ul>
    </template>
  </organism-card>
</template>

<script setup lang="ts">
import { colorList, useColors } from 'atomic'

const { setDefaultColors } = useColors()
</script>
