import axios from 'axios'

export async function sendArtisanCommand(artisanCommand) {
    try {
        const res = await axios.post('/api/artisan', {
            command: artisanCommand,
        })
        return res.data.output
    } catch (error) {
        return 'Error: Could not execute artisan command'
    }
}
