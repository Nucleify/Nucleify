<template>
  <molecule-anchor
    class="tile my-card"
    :href="props.href"
    :ad-type="props.adType"
  >
    <div class="general">
      <div class="info">
        <atom-paragraph class="header" :text="props.header" />
        <atom-paragraph class="count" :text="props.count" />
      </div>
      <atom-icon class="icon" :icon="props.icon" :ad-type="props.adType" />
    </div>
    <div class="secondary">
      <atom-paragraph class="count" :text="props.countSecondary + ' new'" />
      <atom-paragraph class="text" :text="props.textSecondary" />
    </div>
  </molecule-anchor>
</template>

<script setup lang="ts">
import { TileInterface } from '.'

const props = defineProps<TileInterface>()
</script>
