<template>
  <ad-logo 
    class="bounce-animation ball"
    ad-type="main"
    dimensions="175"
  />
</template>

<script setup lang="ts">
import { useBounceAnimation, useBounceClick } from '.'

onMounted(() => {
  const { ballBounce } = useBounceAnimation()
  useBounceClick(ballBounce)
})
</script>
