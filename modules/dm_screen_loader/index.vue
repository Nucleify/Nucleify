<template>
  <div class="screen-loader-container">
    <div class="screen-loader-content">
      <ad-image
        :src="imgUrl + 'logo.svg'"
        alt="DataManager logo"
        width="150px"
        height="150px"
      />
      <ad-progress-bar mode="indeterminate" width="100px" height="10px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { hideLoader } from '.'

hideLoader()
</script>
