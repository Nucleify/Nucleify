<template>
  <div class="panel-container settings-panel-container">
    <template v-if="!isClient">
      <dm-skeleton-settings-card v-for="i in 2" :key="i" />
    </template>
    <client-only>
      <dm-color-settings-card />
      <dm-display-charts />
    </client-only>
  </div>
</template>
