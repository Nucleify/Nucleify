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
import type { TerminalInterface } from 'atomic'
import { handleCommands, transformProps } from 'atomic'

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