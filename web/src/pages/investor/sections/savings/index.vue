<template>
  <section
    id="savings"
    class="nuc-home-section nuc-investor-savings nuc-home-panel"
    aria-labelledby="nuc-investor-savings-title"
  >
    <p class="nuc-home-eyebrow">{{ copy.savingsEyebrow }}</p>
    <h2 id="nuc-investor-savings-title" class="nuc-home-title">
      {{ copy.savingsTitle }}
    </h2>
    <p class="nuc-home-support">{{ copy.savingsSupport }}</p>

    <div class="nuc-investor-savings-grid">
      <article
        v-for="item in savings"
        :key="item.id"
        class="nuc-investor-savings-card"
      >
        <p class="nuc-investor-savings-value">{{ item.value }}</p>
        <p class="nuc-investor-savings-unit">{{ item.unit }}</p>
        <h3 class="nuc-investor-savings-label">{{ item.label }}</h3>
        <p class="nuc-investor-savings-detail">{{ item.detail }}</p>
      </article>
    </div>

    <p class="nuc-investor-savings-note">{{ copy.savingsNote }}</p>
  </section>
</template>

<script setup lang="ts">
import {
  NUC_INVESTOR_COPY,
  NUC_INVESTOR_SAVINGS,
} from '../../constants/content'

const copy = NUC_INVESTOR_COPY
const savings = NUC_INVESTOR_SAVINGS
</script>
