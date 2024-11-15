<template>
  <div class="start-container container">
    <div class="about-animation">
      <animation />
    </div>
    <div class="about-us">
      <ad-header :tag="1" text="About Us" class="shiny-text about-title" />
      <ad-paragraph
        text="We are passionate about providing innovative systems for data management and storage. Our priority is the reliability and security of your information"
        class="about-description"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Animation } from '.'
</script>
