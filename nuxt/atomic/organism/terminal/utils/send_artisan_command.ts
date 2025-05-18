export async function sendArtisanCommand(artisanCommand: string) {
  try {
    const res = await $fetch('/api/artisan', {
      method: 'POST',
      body: { command: artisanCommand },
    })
    return (res as any).output
  } catch (error) {
    return 'Error: Could not execute artisan command'
  }
}
