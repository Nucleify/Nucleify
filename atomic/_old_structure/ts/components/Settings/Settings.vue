<template>
    <div class="panelContainer settingsPanelContainer">
        <color-settings />
        <display-charts />
    </div>
</template>

<script setup lang="ts">
import { ColorSettings, DisplayCharts } from '@/components'
</script>

<style scoped>
:deep(.p-card-body) {
    padding: 0;
}
</style>
