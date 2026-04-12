<template>
  <FileUpload v-bind="transformProps(props)"> <slot /> </FileUpload>
</template>

<script setup lang="ts">
import type { FileUploadInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<FileUploadInterface>()
</script>
