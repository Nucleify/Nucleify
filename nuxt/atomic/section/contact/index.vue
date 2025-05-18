<template>
  <div id="contact">
    <div class="contact-content container">
      <atom-heading :tag="3" text="Contact Us" class="contact-content-title" />
      <atom-paragraph
        text="
          If you have any questions, need assistance, or would like to learn more
          about our project, don’t hesitate to reach out. We’re here to help!
        "
        class="contact-content-description"
      />
      <atom-button
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
