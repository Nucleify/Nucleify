<template>
  <div class="boxes-container">
    <card-box
      v-for="(box, index) in props.boxes"
      :key="index"
      :src="technologiesImgUrl + box.src"
      :label="box.label"
      :description="box.description"
      class="caterpillar"
    />
  </div>
</template>

<script setup lang="ts">
import type { CardBoxesInterface } from 'atomic'

import { CardBox } from './components'

const props = defineProps<CardBoxesInterface>()
</script>
