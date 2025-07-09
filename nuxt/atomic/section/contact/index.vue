<template>
  <div id="contact">
    <div class="contact-content container">
      <ad-paragraph
        :text="t('home.contact.title')"
        class="contact-content-title"
      />
      <ad-paragraph
        :text="t('home.contact.description')"
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

const { t } = useI18n()
</script>
