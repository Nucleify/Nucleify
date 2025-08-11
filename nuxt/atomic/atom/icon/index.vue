<template>
  <Icon v-if="props.icon" :name="props.icon" :ad-type="props.adType" :class-name="props.className" :size="props.size" />
</template>

<script setup lang="ts">
import type { IconInterface } from 'atomic'

const props = defineProps<IconInterface>()
</script>
