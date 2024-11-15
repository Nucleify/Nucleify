<template>
  <div class="start-container container">
    <div class="start-animation">
      <slot />
    </div>
    <div class="start">
      <ad-header
        :tag="1"
        :text="props.header"
        class="shiny-text start-header"
      />
      <ad-paragraph :text="props.description" class="start-description" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { StartSectionInterface } from 'atomic/bosons/types'

const props = defineProps<StartSectionInterface>()
</script>
