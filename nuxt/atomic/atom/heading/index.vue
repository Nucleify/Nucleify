<template>
  <component :is="chooseHeading(props.tag)">
    {{ props.text }}
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { HeadingInterface } from 'atomic'

import { chooseHeading } from '.'

const props = defineProps<HeadingInterface>()
</script>
