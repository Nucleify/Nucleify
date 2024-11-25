<template>
  <Terminal
    :welcome-message="props.welcomeMessage"
    :prompt="props.prompt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import TerminalService from 'primevue/terminalservice'

import { TerminalInterface } from 'atomic/bosons/types'
import { handleCommands } from 'atomic/bosons/utils'

const props = defineProps<TerminalInterface>()

onMounted(() => {
  TerminalService.on('command', handleCommands)
})

onBeforeUnmount(() => {
  TerminalService.off('command', handleCommands)
})
</script>
