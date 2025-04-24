<template>
  <ad-card class="settings-card settings-small-card">
    <template #header>
      <div class="settings-card-header-container">
        <ad-heading :tag="4" text="Charts" />

        <ad-button
          icon="pi pi-refresh"
          ad-type="main"
          class="refresh-button"
          @click="setDefaultChartsDisplay(false, true)"
          rounded
          text
        />
      </div>
    </template>
    <template #content>
      <ul class="settings-card-item-list">
        <li
          class="settings-card-item"
          v-for="item in displayChartList"
          :key="item"
        >
          <ad-label :label="item" :for="item" />

          <ad-select-button
            ad-type="main"
            :model-value="display[item] ? 'On' : 'Off'"
            :options="options"
            @click="displayChartsToggle(item)"
          />
        </li>
      </ul>
    </template>
  </ad-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { displayChartList, useDisplayCharts } from 'atomic'

const { display, setDefaultChartsDisplay, displayChartsToggle } =
  useDisplayCharts()

const options = ref(['On', 'Off'])
</script>
