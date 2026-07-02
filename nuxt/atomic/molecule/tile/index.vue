<template>
  <nuxt-link
    :class="$style['ad-tile']"
    :to="props.href"
    :nui-type="props.nuiType"
    class="ad-tile"
  >
    <div :class="$style['general']">
      <div :class="$style['info']">
        <ad-paragraph :class="$style['header']" :text="props.header" />
        <ad-paragraph :class="$style['count']" :text="props.count" />
      </div>
      <div :class="$style['icon-container']">
        <ad-icon
          :class="$style['icon']"
          :icon="props.icon"
          :nui-type="props.nuiType"
        />
      </div>
    </div>
    <div :class="$style['secondary']">
      <ad-paragraph :class="$style['count']" :text="secondaryCountLabel" />
      <ad-paragraph :class="$style['text']" :text="props.textSecondary" />
    </div>
    <slot />
  </nuxt-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { TileInterface } from '.'

const props = defineProps<TileInterface>()

const secondaryCountLabel = computed(() => {
  const raw = props.countSecondary
  const n =
    typeof raw === 'number'
      ? raw
      : typeof raw === 'string'
        ? Number(raw)
        : Number((raw as { count?: unknown })?.count)
  const safe = Number.isFinite(n) ? n : 0
  return `${safe} new`
})
</script>

<style lang="scss" module>
@import 'index';
</style>
