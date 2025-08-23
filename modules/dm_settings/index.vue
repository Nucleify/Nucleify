<template>
  <div class="panel-container">
    <ad-card class="settings-main-card">
      <template #header>
        <h2>Settings</h2>
      </template>
      <template #content>
        <template v-if="!isClient">
          <dm-skeleton-settings-card v-for="i in 2" :key="i" />
        </template>
        <template v-else>
          <client-only>
            <dm-color-settings-card />
            <dm-settings-chart-card />
          </client-only>
        </template>
      </template>
    </ad-card>
  </div>
</template>
