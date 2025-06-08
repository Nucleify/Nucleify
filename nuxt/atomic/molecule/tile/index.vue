<template>
  <ad-anchor class="tile my-card" :href="props.href" :ad-type="props.adType">
    <div class="general">
      <div class="info">
        <ad-paragraph class="header" :text="props.header" />
        <ad-paragraph class="count" :text="props.count" />
      </div>
      <ad-icon class="icon" :icon="props.icon" :ad-type="props.adType" />
    </div>
    <div class="secondary">
      <ad-paragraph class="count" :text="props.countSecondary + ' new'" />
      <ad-paragraph class="text" :text="props.textSecondary" />
    </div>
  </ad-anchor>
</template>

<script setup lang="ts">
import { AdIcon, AdParagraph } from '../../atom' // Import for Storybook
import { AdAnchor } from '../../molecule' // Import for Storybook

import type { TileInterface } from 'atomic'

const props = defineProps<TileInterface>()
</script>
