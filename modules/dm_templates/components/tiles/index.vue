<template>
  <div :class="$style['dm-tiles']">
    <ad-tile
      v-for="(entity, index) in props.entities"
      v-bind="entity"
      :key="index"
    />
  </div>
</template>

<script setup lang="ts">
import type { TilesInterface } from '.'

const props = defineProps<TilesInterface>()
</script>

<style lang="scss" module>
@import 'index';
</style>