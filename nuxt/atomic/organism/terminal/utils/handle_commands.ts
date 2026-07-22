import TerminalService from 'primevue/terminalservice'
import { sendTerminalCommand } from '../../../../../modules/nuc_terminal/utils/api'

export async function handleCommands(text: string): Promise<void> {
  const response = await sendTerminalCommand(text)

  TerminalService.emit('response', response)
}
