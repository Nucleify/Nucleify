<template>
  <nuc-settings-card
    heading="Colors"
    :show-button="true"
    :onButtonClick="resetColorsToDefault"
  >
    <ul class="settings-card-item-list">
      <li v-for="item in colorList" :key="item" class="settings-card-item">
        <ad-label :label="item" :for="item" />
        <nuc-color-picker :ad-type="item.toLowerCase()" />
      </li>
    </ul>
  </nuc-settings-card>
</template>

<script setup lang="ts">
import { colorList, resetColorsToDefault } from 'atomic'
</script>
