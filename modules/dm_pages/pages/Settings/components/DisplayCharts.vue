<template>
  <ad-card class="settings-card settings-small-card">
    <template #header>
      <div class="settings-card-header-container">
        <ad-heading :tag="4" text="Charts" />

        <ad-button
          icon="prime:refresh"
          ad-type="main"
          class="refresh-button"
          rounded
          text
          @click="displayChartsStore.setAllTrue()"
        />
      </div>
    </template>
    <template #content>
      <ul class="settings-card-item-list">
        <li
          v-for="item in displayChartList"
          :key="item"
          class="settings-card-item"
        >
          <ad-label :label="item" :for="item" />

          <ad-select-button
            ad-type="main"
            :model-value="displayCharts[item].value ? 'On' : 'Off'"
            :options="options"
            @click="displayChartsStore.toggle(item)"
          />
        </li>
      </ul>
    </template>
  </ad-card>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import { displayChartList } from 'atomic'

import { useDisplayChartsStore } from '~/stores/display_charts'

const displayChartsStore = useDisplayChartsStore()
const displayCharts = storeToRefs(displayChartsStore)
const options = ref(['On', 'Off'])
</script>
