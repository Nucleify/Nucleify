<template>
  <ad-anchor class="tile my-card" :href="props.href" :v-type="props.type">
    <div class="general">
      <div class="info">
        <ad-paragraph class="header" :text="props.header" />
        <ad-paragraph class="count" :text="props.count" />
      </div>
      <ad-icon class="icon" :icon="props.icon" :v-type="props.type" />
    </div>
    <div class="secondary">
      <ad-paragraph class="count" :text="props.countSecondary" />
      <ad-paragraph class="text" :text="props.textSecondary" />
    </div>
  </ad-anchor>
</template>

<script setup lang="ts">
import { TileInterface } from 'atomic/bosons/types'

const props = defineProps<TileInterface>()
</script>
