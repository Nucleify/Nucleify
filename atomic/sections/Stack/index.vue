<template>
  <div class="container">
    <ad-card-boxes :boxes="technologyStack" />
  </div>
</template>

<script setup lang="ts">
import { technologyStack } from './constants'
</script>
