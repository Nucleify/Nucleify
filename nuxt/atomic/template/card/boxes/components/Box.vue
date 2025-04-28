<template>
  <organism-card class="card-box">
    <template #title>
      <div class="card-box-heading">
        <atom-image
          :src="props.src"
          :alt="props.title"
          class="card-box-heading-image"
        />
        <atom-paragraph :text="props.title" class="card-box-heading-title" />
      </div>
    </template>
    <template #content>
      <div class="card-box-description">
        <atom-paragraph :text="props.description" />
      </div>
    </template>
  </organism-card>
</template>

<script setup lang="ts">
import { BoxInterface } from 'atomic'

const props = defineProps<BoxInterface>()
</script>
