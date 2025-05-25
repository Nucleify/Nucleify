<template>
  <div class="screen-loader-container">
    <div class="screen-loader-content">
      <DMScreenLoaderLogo />
      <ad-progress-bar mode="indeterminate" width="100px" height="10px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { DMScreenLoaderLogo, hideLoader } from '.'

onMounted(() => {
  hideLoader()
})
</script>
