<template>
  <Breadcrumb v-bind="transformProps(props, excludedProps, propMap)">
    <template #item="{ item }">
      <ad-anchor
        :href="item.href ?? item.url"
        :label="item.label"
        :icon="item.icon"
      />
    </template>
    <template #separator>
      <ad-icon :icon="props.separator" />
    </template>
  </Breadcrumb>
</template>

<script setup lang="ts">
import type { BreadcrumbInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<BreadcrumbInterface>()

const excludedProps = ['separator']

const propMap = { items: 'model' }
</script>
