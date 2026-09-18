<template>
  <section
    id="surface"
    class="nuc-home-section nuc-investor-surface nuc-home-panel"
    aria-labelledby="nuc-investor-surface-title"
  >
    <p class="nuc-home-eyebrow">{{ copy.surfaceEyebrow }}</p>
    <h2 id="nuc-investor-surface-title" class="nuc-home-title">
      {{ copy.surfaceTitle }}
    </h2>
    <p class="nuc-home-support">{{ copy.surfaceSupport }}</p>

    <div class="nuc-investor-surface-grid">
      <article
        v-for="item in surface"
        :key="item.id"
        class="nuc-investor-surface-chip"
        :style="{ '--chip-color': item.color }"
      >
        <span class="nuc-investor-surface-icon" aria-hidden="true">
          <nui-icon :icon="item.icon" />
        </span>
        <h3 class="nuc-investor-surface-label">{{ item.label }}</h3>
        <p class="nuc-investor-surface-detail">{{ item.detail }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  NUC_INVESTOR_COPY,
  NUC_INVESTOR_SURFACE,
} from '../../constants/content'

const copy = NUC_INVESTOR_COPY
const surface = NUC_INVESTOR_SURFACE
</script>
