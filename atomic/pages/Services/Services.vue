<template>
  <ad-home-navbar />
  <div class="services-container">
    <ad-start-section
      header="Services"
      description="Thoughtfully organized sections allow easy browsing and management of key data management areas. With a clear structure, users can quickly find the tools and information needed for effective data handling."
    >
      <ServicesStartAnimation />
    </ad-start-section>
    <ad-card-category-section :cards="servicesCategoriesCards" />
  </div>
  <ad-home-footer />
</template>
<script setup lang="ts">
import { ServicesStartAnimation } from './Sections'

import { servicesCategoriesCards } from 'atomic/bosons/constants'
</script>
