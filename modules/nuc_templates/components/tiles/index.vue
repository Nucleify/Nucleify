<template>
  <div :class="$style['nuc-tiles']">
    <ad-tile
      v-for="(entity, index) in props.entities"
      v-bind="entity"
      :key="index"
    />
  </div>
</template>

<script setup lang="ts">
import type { NucTilesInterface } from '.'

const props = defineProps<NucTilesInterface>()
</script>

<style lang="scss" module>
@import 'index';
</style>