<template>
  <div class="screen-loader-container">
    <div class="screen-loader-content">
      <ad-logo 
        class="loader-image"
        dimensions="125" 
      />
      <ad-progress-bar mode="indeterminate" width="100px" height="10px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { hideLoader } from '.'

onMounted(() => {
  hideLoader()
})
</script>
