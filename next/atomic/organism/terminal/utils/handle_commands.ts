import { TerminalService } from 'primereact/terminalservice'

declare function sendArtisanCommand(text: string): Promise<string>

export async function handleCommands(text: string): Promise<void> {
  const response = await sendArtisanCommand(text)

  TerminalService.emit('response', response)
}
