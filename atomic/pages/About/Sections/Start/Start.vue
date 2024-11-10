<template>
  <div class="start-container container">
    <div class="about-animation">
      <animation />
    </div>
    <div class="about-us">
      <ad-header :tag="1" text="About Us" class="shiny-text about-title" />
      <ad-paragraph
        text="With us, you will store your data effectively and safely."
        class="about-description"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Animation } from '.'
</script>
