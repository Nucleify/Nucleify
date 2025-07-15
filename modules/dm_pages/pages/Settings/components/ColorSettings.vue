<template>
  <ad-card class="settings-card settings-small-card">
    <template #header>
      <div class="settings-card-header-container">
        <ad-heading :tag="4" :text="t('admin.settings.colors.header')" />

        <ad-button
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
          <ad-label
            :label="t('admin.settings.colors.' + item.toLocaleLowerCase())"
            :for="item"
          />
          <ad-color-picker :ad-type="item.toLowerCase()" />
        </li>
      </ul>
    </template>
  </ad-card>
</template>

<script setup lang="ts">
import { colorList, useColors } from 'atomic'

const { t } = useI18n()

const { setDefaultColors } = useColors()
</script>
