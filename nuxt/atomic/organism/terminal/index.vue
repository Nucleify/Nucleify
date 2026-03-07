<template>
  <Terminal 
    v-bind="transformProps(props)"
    :class="$style['ad-terminal']"
    :pt="{
      command: $style['ad-terminal-command'],
      response: $style['ad-terminal-response'],
    }"
  />
</template>

<script setup lang="ts">
import { handleCommands, transformProps } from 'nucleify'

import type { TerminalInterface } from '.'

import TerminalService from 'primevue/terminalservice'

const props = defineProps<TerminalInterface>()

onMounted(() => {
  TerminalService.on('command', handleCommands)
})

onBeforeUnmount(() => {
  TerminalService.off('command', handleCommands)
})
</script>

<style lang="scss" module>
@import 'index';
</style>