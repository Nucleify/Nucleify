<template>
  <ad-logo 
    class="bounce-animation ball"
    :dimensions="isMobile() ? 100 : 150"
  />
</template>

<script setup lang="ts">
import { useBounceAnimation, useBounceClick } from '.'

onMounted(() => {
  const { ballBounce } = useBounceAnimation()
  useBounceClick(ballBounce)
})
</script>
