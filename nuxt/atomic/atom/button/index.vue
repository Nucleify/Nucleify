<template>
  <Button
    :label="props.label"
    :icon-pos="props.iconPos"
    :icon-class="props.iconClass"
    :badge="props.badge"
    :badge-class="props.badgeClass"
    :badge-severity="props.badgeSeverity"
    :loading="props.loading"
    :loading-icon="props.loadingIcon"
    :as="props.as"
    :as-child="props.asChild"
    :link="props.link"
    :severity="props.severity"
    :raised="props.raised"
    :rounded="props.rounded"
    :text="props.text"
    :outlined="props.outlined"
    :size="props.size"
    :variant="props.variant"
    :fluid="props.fluid"
    :dt="props.dt"
    :disabled="props.disabled"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :type="props.type"
    :style="{
      width: props.width,
      gap: props.gap,
      padding: props.padding,
    }"
    :ad-type="props.adType"
    @click="props.onclick"
  >
    <ad-image v-if="props.src" :src="props.src" :alt="props.alt" />
    <ad-icon v-if="props.icon" :icon="props.icon" />
    <template v-if="props.label">{{ props.label }}</template>
    <slot />
  </Button>
</template>

<script setup lang="ts">
import type { ButtonInterface } from 'atomic'

import Button from 'primevue/button' // Import for Storybook

const props = defineProps<ButtonInterface>()
</script>
