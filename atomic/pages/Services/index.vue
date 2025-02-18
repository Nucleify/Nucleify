<template>
  <div class="services-container">
    <ad-section-start
      header="Services"
      description="Thoughtfully organized sections allow easy browsing and management of key data management areas. With a clear structure, users can quickly find the tools and information needed for effective data handling."
    >
      <ServicesStartAnimation />
    </ad-section-start>
    <ad-section-category
      :cards="servicesCategoriesCards"
      :prefix="storysetServicesImgUrl"
    />
    <ad-section-faq site="services" />
    <ad-section-contact />
  </div>
</template>

<script setup lang="ts">
import { ServicesStartAnimation, servicesCategoriesCards } from 'atomic'
</script>
