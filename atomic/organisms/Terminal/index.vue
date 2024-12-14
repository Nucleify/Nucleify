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
import { onMounted, onBeforeUnmount } from 'vue'
import TerminalService from 'primevue/terminalservice'

import { TerminalInterface, handleCommands } from 'atomic'

const props = defineProps<TerminalInterface>()

onMounted(() => {
  TerminalService.on('command', handleCommands)
})

onBeforeUnmount(() => {
  TerminalService.off('command', handleCommands)
})
</script>
