/**
 * @vitest-environment jsdom
 */

import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { NucFriendshipObjectInterface } from '../types'

import { act, renderHook } from '@testing-library/react'
import { useFriendshipPopover } from './use_friendship_popover'

describe('useFriendshipPopover', (): void => {
  const mockFriendshipAccepted: NucFriendshipObjectInterface = {
    id: 1,
    friend: {
      id: 2,
      name: 'Friend 1',
      email: 'friend1@example.com',
      role: 'user',
    },
    status: 'accepted',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const mockFriendshipPending: NucFriendshipObjectInterface = {
    id: 2,
    friend: {
      id: 3,
      name: 'Friend 2',
      email: 'friend2@example.com',
      role: 'user',
    },
    status: 'pending',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const mockFriendshipBlocked: NucFriendshipObjectInterface = {
    id: 3,
    friend: {
      id: 4,
      name: 'Friend 3',
      email: 'friend3@example.com',
      role: 'user',
    },
    status: 'blocked',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  const mockProps = {
    results: [
      mockFriendshipAccepted,
      mockFriendshipPending,
      mockFriendshipBlocked,
    ],
    acceptRequest: vi.fn(),
    denyRequest: vi.fn(),
    removeFriend: vi.fn(),
    blockFriend: vi.fn(),
    unblockFriend: vi.fn(),
  }

  beforeEach((): void => {
    vi.clearAllMocks()
  })

  it('should initialize activeTab as friends', (): void => {
    const { result } = renderHook(() => useFriendshipPopover(mockProps))
    expect(result.current.activeTab).toBe('friends')
  })

  it('should filter friends correctly', (): void => {
    const { result } = renderHook(() => useFriendshipPopover(mockProps))
    expect(result.current.friends).toEqual([mockFriendshipAccepted])
  })

  it('should filter requests correctly', (): void => {
    const { result } = renderHook(() => useFriendshipPopover(mockProps))
    expect(result.current.requests).toEqual([mockFriendshipPending])
  })

  it('should filter blocked correctly', (): void => {
    const { result } = renderHook(() => useFriendshipPopover(mockProps))
    expect(result.current.blocked).toEqual([mockFriendshipBlocked])
  })

  it('should return empty array when results is empty', (): void => {
    const { result } = renderHook(() =>
      useFriendshipPopover({ ...mockProps, results: [] })
    )
    expect(result.current.friends).toEqual([])
    expect(result.current.requests).toEqual([])
    expect(result.current.blocked).toEqual([])
  })

  it('should call acceptRequest when handleAcceptRequest is called', async (): Promise<void> => {
    const { result } = renderHook(() => useFriendshipPopover(mockProps))
    await act(async () => {
      await result.current.handleAcceptRequest(1)
    })
    expect(mockProps.acceptRequest).toHaveBeenCalledWith(1)
  })

  it('should call denyRequest when handleDenyRequest is called', async (): Promise<void> => {
    const { result } = renderHook(() => useFriendshipPopover(mockProps))
    await act(async () => {
      await result.current.handleDenyRequest(2)
    })
    expect(mockProps.denyRequest).toHaveBeenCalledWith(2)
  })

  it('should update filtered lists when results change', (): void => {
    const { result, rerender } = renderHook(
      ({ results }) => useFriendshipPopover({ ...mockProps, results }),
      {
        initialProps: { results: mockProps.results },
      }
    )

    const newFriendship: NucFriendshipObjectInterface = {
      id: 4,
      friend: {
        id: 5,
        name: 'Friend 4',
        email: 'friend4@example.com',
        role: 'user',
      },
      status: 'accepted',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    rerender({ results: [newFriendship] })

    expect(result.current.friends).toEqual([newFriendship])
    expect(result.current.requests).toEqual([])
    expect(result.current.blocked).toEqual([])
  })
})
