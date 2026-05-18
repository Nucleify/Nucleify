'use client'

import { apiRequest } from 'nucleify'

import type { ArtisanResponseInterface } from '../types/interfaces'

function apiUrl(): string {
  return '/api'
}

export async function sendArtisanCommand(
  artisanCommand: string
): Promise<string> {
  try {
    const response = await apiRequest<ArtisanResponseInterface>(
      apiUrl() + '/artisan',
      'POST',
      { command: artisanCommand }
    )

    // Handle both wrapped and unwrapped response shapes defensively
    const output =
      response && typeof response === 'object' && 'data' in response
        ? (response.data as ArtisanResponseInterface).output
        : (response as unknown as ArtisanResponseInterface).output

    return output
  } catch (error) {
    return `Error: Could not execute artisan command\n${error}`
  }
}
