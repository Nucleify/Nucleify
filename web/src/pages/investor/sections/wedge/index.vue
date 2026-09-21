<template>
  <section
    id="wedge"
    class="nuc-home-section nuc-investor-wedge nuc-home-panel"
    aria-labelledby="nuc-investor-wedge-title"
  >
    <p class="nuc-home-eyebrow">{{ copy.wedgeEyebrow }}</p>
    <h2 id="nuc-investor-wedge-title" class="nuc-home-title">
      {{ copy.wedgeTitle }}
    </h2>
    <p class="nuc-home-support">{{ copy.wedgeSupport }}</p>

    <ol class="nuc-investor-wedge-rail" aria-label="Go-to-market stages">
      <li
        v-for="(item, index) in wedge"
        :key="item.phase"
        class="nuc-investor-wedge-step"
        :style="{ '--step-i': index }"
      >
        <div class="nuc-investor-wedge-node" aria-hidden="true">
          <span class="nuc-investor-wedge-dot" />
          <span
            v-if="index < wedge.length - 1"
            class="nuc-investor-wedge-link"
          />
        </div>
        <div class="nuc-investor-wedge-copy">
          <p class="nuc-investor-wedge-phase">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            {{ item.phase }}
          </p>
          <h3 class="nuc-investor-wedge-title">{{ item.title }}</h3>
          <p class="nuc-investor-wedge-body">{{ item.body }}</p>
          <p class="nuc-investor-wedge-signal">{{ item.signal }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
import { NUC_INVESTOR_COPY, NUC_INVESTOR_WEDGE } from '../../constants/content'

const copy = NUC_INVESTOR_COPY
const wedge = NUC_INVESTOR_WEDGE
</script>
