<template>
  <ad-home-navbar />
  <div class="about-container">
    <start />
    <ad-card-category-section :cards="aboutCategoriesCards" />
  </div>
  <ad-home-footer />
</template>

<script setup lang="ts">
import { Start } from './Sections'

import { aboutCategoriesCards } from 'atomic/bosons/constants'
</script>
