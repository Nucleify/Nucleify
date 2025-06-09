import type { ArtisanResponseInterface } from 'atomic'

export async function sendArtisanCommand(artisanCommand: string) {
  try {
    const res: ArtisanResponseInterface = await $fetch('/api/artisan', {
      method: 'POST',
      body: { command: artisanCommand },
    })
    return res.output
  } catch {
    return 'Error: Could not execute artisan command'
  }
}
