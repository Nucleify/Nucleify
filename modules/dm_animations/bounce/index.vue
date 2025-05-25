<template>
  <animation-logo />
</template>

<script setup lang="ts">
import { useBounceAnimation, useBounceClick } from '.'

import AnimationLogo from './logo.vue'

onMounted(() => {
  const { ballBounce } = useBounceAnimation()
  useBounceClick(ballBounce)
})
</script>
