<template>
  <div class="boxes-container">
    <nuc-card-box
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
import type { NucCardBoxesInterface } from 'atomic'

const props = defineProps<NucCardBoxesInterface>()
</script>
