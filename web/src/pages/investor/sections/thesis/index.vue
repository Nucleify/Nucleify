<template>
  <section
    id="thesis"
    class="nuc-home-section nuc-investor-thesis nuc-home-panel"
    aria-labelledby="nuc-investor-thesis-title"
  >
    <p class="nuc-home-eyebrow">{{ copy.thesisEyebrow }}</p>
    <h2 id="nuc-investor-thesis-title" class="nuc-home-title">
      {{ copy.thesisTitle }}
    </h2>
    <p class="nuc-home-support">{{ copy.thesisSupport }}</p>

    <div class="nuc-investor-thesis-grid">
      <article
        v-for="item in thesis"
        :key="item.index"
        class="nuc-investor-thesis-card"
      >
        <span class="nuc-investor-thesis-index">{{ item.index }}</span>
        <h3 class="nuc-investor-thesis-title">{{ item.title }}</h3>
        <p class="nuc-investor-thesis-body">{{ item.body }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { NUC_INVESTOR_COPY, NUC_INVESTOR_THESIS } from '../../constants/content'

const copy = NUC_INVESTOR_COPY
const thesis = NUC_INVESTOR_THESIS
</script>
