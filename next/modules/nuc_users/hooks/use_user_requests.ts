'use client'

import { useState } from 'react'

import { apiHandle, apiUrl, type NucUserObjectInterface } from 'nucleify'

export type NucUserRequestsInterface = ReturnType<typeof useUserRequests>

export function useUserRequests() {
  const [results, setResults] = useState<NucUserObjectInterface[]>([])

  async function getAllUsers(): Promise<void> {
    await apiHandle<NucUserObjectInterface[]>({
      url: apiUrl() + '/users',
      onSuccess: (response: NucUserObjectInterface[]) => {
        setResults(response)
      },
    })
  }

  return {
    results,
    getAllUsers,
  }
}

export { useUserRequests as userRequests }
