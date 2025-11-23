<template>
  <Galleria v-bind="transformProps(props, excludedProps)">
    <template #item>
      <div v-for="(item, index) in props.items" :key="index">
        <img :src="item.itemImageSrc" :alt="item.alt" />
      </div>
    </template>
    <template #thumbnail>
      <div v-for="(item, index) in props.items" :key="index">
        <img :src="item.thumbnailImageSrc" :alt="item.alt" />
      </div>
    </template>
  </Galleria>
</template>

<script setup lang="ts">
import type { GalleriaInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<GalleriaInterface>()

const excludedProps = ['items']
</script>
