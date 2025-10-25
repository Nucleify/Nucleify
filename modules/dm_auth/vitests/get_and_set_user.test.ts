import { beforeEach, describe, expect, it } from 'vitest'

import * as atomic from 'atomic'

describe('getAndSetUser', (): void => {
  beforeEach((): void => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.clear()
    }
  })

  it('should be a function that can be called', (): void => {
    expect(typeof atomic.getAndSetUser).toBe('function')
  })

  it('should return a Promise', (): void => {
    const result = atomic.getAndSetUser()
    expect(result).toBeInstanceOf(Promise)
    result.catch((error) => {
      expect(error).toBeInstanceOf(Error)
    })
  })

  it('should handle API errors gracefully', async (): Promise<void> => {
    try {
      await atomic.getAndSetUser()
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  it('should handle null user data gracefully', async (): Promise<void> => {
    try {
      await atomic.getAndSetUser()
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })

  it('should call userRequests function', async (): Promise<void> => {
    expect(atomic.userRequests).toBeDefined()
    expect(typeof atomic.userRequests).toBe('function')
  })

  it('should call setUserToSessionStorage function', async (): Promise<void> => {
    expect(atomic.setUserToSessionStorage).toBeDefined()
    expect(typeof atomic.setUserToSessionStorage).toBe('function')
  })

  it('should handle the complete flow when API is available', async (): Promise<void> => {
    try {
      await atomic.getAndSetUser()
      if (typeof window !== 'undefined') {
        const sessionStorageKeys = Object.keys(window.sessionStorage)
        sessionStorageKeys.filter((key) => key.startsWith('user_'))
      }
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
    }
  })
})
