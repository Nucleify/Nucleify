<template>
  <FileUpload v-bind="transformProps(props)" />
</template>

<script setup lang="ts">
import type { FileUploadInterface } from 'atomic'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<FileUploadInterface>()
</script>
