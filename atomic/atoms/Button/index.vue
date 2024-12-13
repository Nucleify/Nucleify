<template>
  <Button
    :label="props.label"
    :icon="props.icon"
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
    @click="props.onclick"
    :style="{
      width: props.width,
      gap: props.gap,
      padding: props.padding,
    }"
    :ad-type="props.adType"
  >
    <ad-image v-if="props.src" :src="props.src" />
    <template v-if="props.label">{{ props.label }}</template>
    <slot />
  </Button>
</template>

<script setup lang="ts">
import Button from 'primevue/button' // Import for Storybook

import { ButtonInterface } from 'atomic/bosons/types'

const props = defineProps<ButtonInterface>()
</script>
