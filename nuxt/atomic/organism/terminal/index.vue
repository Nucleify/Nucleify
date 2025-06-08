<template>
  <Terminal
    :welcome-message="props.welcomeMessage"
    :prompt="props.prompt"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import TerminalService from 'primevue/terminalservice'

import type { TerminalInterface } from 'atomic'
import { handleCommands } from 'atomic'

const props = defineProps<TerminalInterface>()

onMounted(() => {
  TerminalService.on('command', handleCommands)
})

onBeforeUnmount(() => {
  TerminalService.off('command', handleCommands)
})
</script>
