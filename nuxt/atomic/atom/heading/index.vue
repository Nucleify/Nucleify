<template>
  <component :is="chooseHeading(props.tag)">
    {{ $t(String(props.text ?? ''), String(props.text ?? '')) }}
    <slot />
  </component>
</template>

<script setup lang="ts">
import type { HeadingInterface } from '.'
import { chooseHeading } from '.'

const props = defineProps<HeadingInterface>()
</script>
