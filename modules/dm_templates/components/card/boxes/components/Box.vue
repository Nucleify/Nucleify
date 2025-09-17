<template>
  <ad-card class="card-box">
    <template #title>
      <div class="card-box-heading">
        <ad-image
          :src="props.src"
          :alt="props.label"
          class="card-box-heading-image"
        />
        <ad-paragraph :text="props.label" class="card-box-heading-text" />
      </div>
    </template>
    <template #content>
      <div class="card-box-description">
        <ad-paragraph :text="props.description" />
      </div>
    </template>
  </ad-card>
</template>

<script setup lang="ts">
import type { BoxInterface } from 'atomic'

const props = defineProps<BoxInterface>()
</script>
