<template>
  <div class="start-section container">
    <div class="start-animation">
      <slot />
    </div>
    <div class="start">
      <ad-heading
        :tag="1"
        :text="props.header"
        class="shiny-text start-header"
      />
      <ad-paragraph :text="props.description" class="start-description" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SectionStartInterface } from 'atomic/bosons/types'

const props = defineProps<SectionStartInterface>()
</script>
