<template>
  <div id="contact">
    <div class="contact-content container">
      <ad-paragraph text="Contact Us" class="contact-content-title" />
      <ad-paragraph
        text="
          If you have any questions, need assistance, or would like to learn more
          about our project, don’t hesitate to reach out. We’re here to help!
        "
        class="contact-content-description"
      />
      <ad-button
        class="contact-content-button caterpillar"
        label="Mail"
        @click="navigateTo('mailto:business@atomic-it.org')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from 'atomic'
</script>
