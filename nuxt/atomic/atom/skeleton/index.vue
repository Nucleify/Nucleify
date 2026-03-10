<template>
  <Skeleton v-if="props.loading" v-bind="transformProps(props, excludedProps)">
    <slot />
  </Skeleton>
</template>

<script setup lang="ts">
import { Skeleton } from 'primevue' // Import for Storybook

import type { SkeletonInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<SkeletonInterface>()

const excludedProps = ['loading']
</script>
