<template>
  <ad-button label="Block" @click="blocked = true" />
  <ad-button label="Unblock" @click="blocked = false" />

  <BlockUI
    v-for="(panel, index) in props.panels"
    :key="index"
    :blocked="props.blocked"
    :full-screen="props.fullScreen"
    :base-z-index="props.baseZIndex"
    :auto-z-index="props.autoZIndex"
    :dt="props.dt"
    :pt="props.dt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  >
    <ad-heading :tag="3" :text="panel.header" />
    <ad-paragraph :text="panel.content" />
  </BlockUI>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import BlockUI from 'primevue/blockui' // Import for Storybook

import AdButton from 'atomic/atoms/Button/index.vue'
import AdParagraph from 'atomic/atoms/Paragraph/index.vue'
import AdHeading from 'atomic/atoms/Heading/index.vue'

import { BlockUIInterface } from 'atomic/bosons/types'

const props = defineProps<BlockUIInterface>()

const blocked = ref(false)
</script>
