<template>
  <i v-if="props.icon" :class="props.icon" :ad-type="props.adType" />
</template>

<script setup lang="ts">
import { IconInterface } from 'atomic/bosons/types'

const props = defineProps<IconInterface>()
</script>
