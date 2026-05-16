import { sendTerminalCommand } from 'nucleify'

import TerminalService from 'primevue/terminalservice'

export async function handleCommands(text: string): Promise<void> {
  const response = await sendTerminalCommand(text)

  TerminalService.emit('response', response)
}
