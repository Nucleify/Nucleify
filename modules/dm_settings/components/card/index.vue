<template>
  <ad-card class="settings-card settings-small-card">
    <template #header>
      <div class="settings-card-header-container">
        <ad-heading :tag="4" :text="props.heading" />

        <ad-button
          v-if="props.showButton"
          :icon="props.buttonIcon || 'prime:refresh'"
          ad-type="main"
          class="refresh-button"
          rounded
          text
          @click="props.onButtonClick && props.onButtonClick()"
        />
      </div>
    </template>

    <template #content>
      <slot />
    </template>
  </ad-card>
</template>

<script setup lang="ts">
import type { DMSettingsCardInterface } from './interfaces'

const props = defineProps<DMSettingsCardInterface>()
</script>