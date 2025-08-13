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
import type { TerminalInterface } from 'atomic'
import { handleCommands } from 'atomic'

import TerminalService from 'primevue/terminalservice'

const props = defineProps<TerminalInterface>()

onMounted(() => {
  TerminalService.on('command', handleCommands)
})

onBeforeUnmount(() => {
  TerminalService.off('command', handleCommands)
})
</script>
