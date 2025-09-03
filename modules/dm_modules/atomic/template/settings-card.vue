<template>
  <ad-card class="modules-settings-card">
    <template #content>
      <div class="modules-settings-card-content">
        <div v-for="module in data" :key="module.id" class="modules-settings-card-content-module">
          <dm-modules-cube 
            :class="{ 'shiny': module.enabled }" 
            v-tooltip.right="module.enabled ? 'Enabled' : 'Disabled'" 
            @click="navigateTo('/settings#module-' + module.name)"
          />
          <div class="modules-settings-card-content-module-info">
            <label>{{ module.name }}</label>
            <p>{{ module.description }}</p>
          </div>
        </div>
      </div>
    </template>
  </ad-card>
</template>

<script setup lang="ts">
import { apiRequest, navigateTo } from 'atomic'

const data = ref([])

onMounted(async () => {
  const response = await apiRequest(apiUrl() + '/modules/installed')

  if (response.modules) {
    data.value = response.modules
  }
})
</script>