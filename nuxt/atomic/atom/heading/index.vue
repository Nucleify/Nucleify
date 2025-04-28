<template>
  <component :is="chooseHeading(props.tag)">
    {{ props.text }}
    <slot />
  </component>
</template>

<script setup lang="ts">
import { HeadingInterface, chooseHeading } from 'atomic'

const props = defineProps<HeadingInterface>()
</script>
