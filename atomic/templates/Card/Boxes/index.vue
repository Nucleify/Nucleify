<template>
  <div class="boxes-container">
    <card-box
      v-for="(technology, index) in props.boxes"
      :key="index"
      :src="technologiesImgUrl + technology.src"
      :title="technology.label"
      :description="technology.description"
      class="caterpillar"
    />
  </div>
</template>

<script setup lang="ts">
import { CardBoxesInterface } from 'atomic'

import { CardBox } from './components'

const props = defineProps<CardBoxesInterface>()
</script>
