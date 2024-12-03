<template>
  <Button label="Block" @click="blocked = true"></Button>
  <Button label="Unblock" @click="blocked = false"></Button>
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
    <Heading tag="3">{{ panel.header }} </Heading>
    <Paragraph> {{ panel.content }} </Paragraph>
  </BlockUI>
</template>

<script setup lang="ts">
import { BlockUIInterface } from 'atomic/bosons/types'
import { ref } from 'vue'
import { Heading, Paragraph } from 'atomic/atoms'

const blocked = ref(false)
const props = defineProps<BlockUIInterface>()
</script>
