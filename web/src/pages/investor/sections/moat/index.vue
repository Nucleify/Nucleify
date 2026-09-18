<template>
  <section
    id="moat"
    class="nuc-home-section nuc-investor-moat nuc-home-panel"
    aria-labelledby="nuc-investor-moat-title"
  >
    <p class="nuc-home-eyebrow">{{ copy.moatEyebrow }}</p>
    <h2 id="nuc-investor-moat-title" class="nuc-home-title">
      {{ copy.moatTitle }}
    </h2>
    <p class="nuc-home-support">{{ copy.moatSupport }}</p>

    <div class="nuc-investor-moat-grid">
      <article
        v-for="item in moat"
        :key="item.title"
        class="nuc-investor-moat-card"
      >
        <span class="nuc-investor-moat-icon" aria-hidden="true">
          <nui-icon :icon="item.icon" />
        </span>
        <div>
          <h3 class="nuc-investor-moat-title">{{ item.title }}</h3>
          <p class="nuc-investor-moat-body">{{ item.body }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { NUC_INVESTOR_COPY, NUC_INVESTOR_MOAT } from '../../constants/content'

const copy = NUC_INVESTOR_COPY
const moat = NUC_INVESTOR_MOAT
</script>
