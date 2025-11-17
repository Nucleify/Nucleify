<template>
  <nuxt-link 
    :class="$style['ad-tile']"
    :to="props.href" 
    :ad-type="props.adType"
  >
    <div :class="$style['general']">
      <div :class="$style['info']">
        <ad-paragraph :class="$style['header']" :text="props.header" />
        <ad-paragraph :class="$style['count']" :text="props.count" />
      </div>
      <div :class="$style['icon-container']">
        <ad-icon :class="$style['icon']" :icon="props.icon" :ad-type="props.adType" />
      </div>
    </div>
    <div :class="$style['secondary']">
      <ad-paragraph :class="$style['count']" :text="props.countSecondary + ' new'" />
      <ad-paragraph :class="$style['text']" :text="props.textSecondary" />
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
import type { TileInterface } from 'atomic'

import { AdIcon, AdParagraph } from '../../atom' // Import for Storybook

const props = defineProps<TileInterface>()
</script>

<style lang="scss" module>
@import 'index';
</style>