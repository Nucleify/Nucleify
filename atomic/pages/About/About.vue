<template>
  <ad-home-navbar />
  <div class="about-container">
    <ad-start-section
      header="About Us"
      description="
        We are passionate about providing innovative systems for data management
        and storage. Our priority is the reliability and security of your information
      "
    >
      <AboutStartAnimation />
    </ad-start-section>
    <ad-card-category-section
      :cards="aboutCategoriesCards"
      :prefix="storysetAboutImgUrl"
    />
  </div>
  <ad-home-footer />
</template>

<script setup lang="ts">
import { AboutStartAnimation } from './Sections'

import { aboutCategoriesCards } from 'atomic/bosons/constants'
</script>
