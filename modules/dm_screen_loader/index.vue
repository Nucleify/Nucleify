<template>
  <div class="screen-loader-container">
    <div class="screen-loader-content">
      <atom-image
        :src="imgUrl + 'logo.svg'"
        alt="DataManager logo"
        width="150px"
        height="150px"
        fetchpriority="high"
      />
      <atom-progress-bar mode="indeterminate" width="100px" height="10px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

import { hideLoader } from '.'

onMounted(() => {
  hideLoader()
})
</script>
