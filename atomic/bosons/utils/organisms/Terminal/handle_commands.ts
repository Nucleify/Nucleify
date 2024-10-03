import TerminalService from 'primevue/terminalservice'

import { sendArtisanCommand } from './send_artisan_command'

export async function handleCommands(text): Promise<void> {
    const argsIndex = text.indexOf(' ')

    const response = await sendArtisanCommand(text.substring(argsIndex + 1))

    TerminalService.emit('response', response)
}
