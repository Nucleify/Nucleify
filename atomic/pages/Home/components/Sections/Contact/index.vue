<template>
  <div class="contact">
    <div class="contact-content container">
      <ad-heading :tag="3" text="Contact Us" class="contact-content-title" />
      <ad-paragraph
        text="
          If you have any questions, need assistance, or would like to learn more
          about our project, don’t hesitate to reach out. We’re here to help!
        "
        class="contact-content-description"
      />
      <ad-button
        class="contact-content-button caterpillar-button"
        label="Mail"
        @click="navigateTo('mailto:szymon.radomski@yahoo.com')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { navigateTo } from 'atomic'
</script>
