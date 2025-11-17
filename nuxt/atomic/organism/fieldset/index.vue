<template>
  <Fieldset v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import type { FieldsetInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<FieldsetInterface>()
</script>
