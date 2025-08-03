<template>
  <nuxt-link class="tile my-card" :to="props.href" :ad-type="props.adType">
    <div class="general">
      <div class="info">
        <ad-paragraph class="header" :text="props.header" />
        <ad-paragraph class="count" :text="props.count" />
      </div>
      <div class="icon-container">
        <ad-icon class="icon" :icon="props.icon" :ad-type="props.adType" />
      </div>
    </div>
    <div class="secondary">
      <ad-paragraph class="count" :text="props.countSecondary + ' new'" />
      <ad-paragraph class="text" :text="props.textSecondary" />
    </div>
  </nuxt-link>
</template>

<script setup lang="ts">
import type { TileInterface } from 'atomic'

import { AdIcon, AdParagraph } from '../../atom' // Import for Storybook

const props = defineProps<TileInterface>()
</script>
