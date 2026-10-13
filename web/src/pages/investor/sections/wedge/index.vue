<template>
  <section
    id="wedge"
    class="nuc-home-section nuc-inv-plan nuc-home-panel"
    aria-labelledby="nuc-investor-wedge-title"
  >
    <header class="nuc-inv-plan-head">
      <p class="nuc-home-eyebrow">{{ copy.wedgeEyebrow }}</p>
      <h2 id="nuc-investor-wedge-title" class="nuc-home-title">
        {{ copy.wedgeTitle }}
      </h2>
      <p class="nuc-home-support">{{ copy.wedgeSupport }}</p>
    </header>

    <ol class="nuc-inv-plan-grid" aria-label="Growth stages">
      <li
        v-for="(item, index) in wedge"
        :key="item.phase"
        class="nuc-inv-plan-card"
        :style="{ '--step-i': index }"
      >
        <div class="nuc-inv-plan-card-top">
          <span class="nuc-inv-plan-icon" aria-hidden="true">
            <nui-icon :icon="item.icon" mode="svg" />
          </span>
          <p class="nuc-inv-plan-phase">
            <span>{{ String(index + 1).padStart(2, '0') }}</span>
            {{ item.phase }}
          </p>
        </div>
        <h3>{{ item.title }}</h3>
        <p class="nuc-inv-plan-body">{{ item.body }}</p>
        <p class="nuc-inv-plan-signal">{{ item.signal }}</p>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
import { NUC_INVESTOR_COPY, NUC_INVESTOR_WEDGE } from '../../constants/content'

const copy = NUC_INVESTOR_COPY
const wedge = NUC_INVESTOR_WEDGE
</script>
