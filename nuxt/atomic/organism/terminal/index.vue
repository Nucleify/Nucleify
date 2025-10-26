<template>
  <Terminal v-bind="transformProps(props)" />
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
