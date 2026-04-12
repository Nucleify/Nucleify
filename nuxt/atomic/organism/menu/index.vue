<template>
  <Menu
    ref="adMenu"
    v-bind="transformProps(props)"
    :class="$style['ad-menu']"
    :pt="{
      list: $style['ad-menu-list'],
      item: $style['ad-menu-item'],
      itemLink: $style['ad-menu-item-link'],
      itemContent: $style['ad-menu-item-content'],
    }"
  >
    <slot />
  </Menu>
</template>

<script setup lang="ts">
import type { MenuInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<MenuInterface>()

const adMenu = ref()

defineExpose({
  toggle: (event: Event) => adMenu.value?.toggle(event),
})
</script>

<style lang="scss" module>
@import 'index';
</style>
