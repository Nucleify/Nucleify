<template>
  <div class="about-container">
    <ad-section-start
      header="About Us"
      description="
        We are passionate about providing innovative systems for data management
        and storage. Our priority is the reliability and security of your information
      "
    >
      <AboutStartAnimation />
    </ad-section-start>
    <ad-section-stack />
    <ad-section-category
      :cards="aboutCategoriesCards"
      :prefix="storysetAboutImgUrl"
    />
    <ad-section-faq site="about" />
    <ad-section-contact />
  </div>
</template>

<script setup lang="ts">
import { AboutStartAnimation, aboutCategoriesCards } from 'atomic'
</script>
