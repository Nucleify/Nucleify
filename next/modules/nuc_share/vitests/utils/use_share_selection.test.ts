import { describe, expect, it } from 'vitest'

import { act, renderHook } from '@testing-library/react'
import { useShareSelection } from '../../components/share-checkbox/utils/use_share_selection'

describe('useShareSelection', (): void => {
  const mockItems = [{ id: 1 }, { id: 2 }, { id: 3 }]

  it('initializes with empty selection', (): void => {
    const { result } = renderHook(() => useShareSelection(mockItems))

    expect(result.current.selected).toEqual({})
    expect(result.current.isAllSelected).toBe(false)
    expect(result.current.isIndeterminate).toBe(false)
  })

  it('toggle selects and deselects item', (): void => {
    const { result } = renderHook(() => useShareSelection(mockItems))

    expect(result.current.isSelected(1)).toBe(false)

    act(() => result.current.toggle(1))
    expect(result.current.isSelected(1)).toBe(true)

    act(() => result.current.toggle(1))
    expect(result.current.isSelected(1)).toBe(false)
  })

  it('selectAll selects all items', (): void => {
    const { result } = renderHook(() => useShareSelection(mockItems))

    act(() => result.current.selectAll())

    expect(result.current.isAllSelected).toBe(true)
    expect(result.current.isSelected(1)).toBe(true)
    expect(result.current.isSelected(2)).toBe(true)
    expect(result.current.isSelected(3)).toBe(true)
  })

  it('deselectAll clears selection', (): void => {
    const { result } = renderHook(() => useShareSelection(mockItems))

    act(() => result.current.selectAll())
    expect(result.current.isAllSelected).toBe(true)

    act(() => result.current.deselectAll())
    expect(result.current.isAllSelected).toBe(false)
    expect(result.current.isSelected(1)).toBe(false)
    expect(result.current.isSelected(2)).toBe(false)
    expect(result.current.isSelected(3)).toBe(false)
  })

  it('toggleAll selects all when none selected', (): void => {
    const { result } = renderHook(() => useShareSelection(mockItems))

    act(() => result.current.toggleAll())
    expect(result.current.isAllSelected).toBe(true)
  })

  it('toggleAll deselects all when all selected', (): void => {
    const { result } = renderHook(() => useShareSelection(mockItems))

    act(() => result.current.selectAll())
    expect(result.current.isAllSelected).toBe(true)

    act(() => result.current.toggleAll())
    expect(result.current.isAllSelected).toBe(false)
  })

  it('isIndeterminate is true when some but not all selected', (): void => {
    const { result } = renderHook(() => useShareSelection(mockItems))

    act(() => result.current.toggle(1))
    expect(result.current.isIndeterminate).toBe(true)
    expect(result.current.isAllSelected).toBe(false)

    act(() => result.current.toggle(2))
    expect(result.current.isIndeterminate).toBe(true)

    act(() => result.current.toggle(3))
    expect(result.current.isIndeterminate).toBe(false)
    expect(result.current.isAllSelected).toBe(true)
  })

  it('getSelectedItems returns selected items', (): void => {
    const { result } = renderHook(() => useShareSelection(mockItems))

    act(() => result.current.toggle(1))
    act(() => result.current.toggle(3))

    const selectedItems = result.current.getSelectedItems<{ id: number }>()
    expect(selectedItems).toHaveLength(2)
    expect(selectedItems.map((i) => i.id)).toEqual([1, 3])
  })

  it('clear removes all selections', (): void => {
    const { result } = renderHook(() => useShareSelection(mockItems))

    act(() => result.current.selectAll())
    expect(result.current.isAllSelected).toBe(true)

    act(() => result.current.clear())
    expect(result.current.isAllSelected).toBe(false)
  })

  it('handles empty items array', (): void => {
    const { result } = renderHook(() => useShareSelection([]))

    expect(result.current.isAllSelected).toBe(false)
    expect(result.current.isIndeterminate).toBe(false)

    act(() => result.current.selectAll())
    expect(result.current.getSelectedItems()).toEqual([])
  })

  it('handles undefined items', (): void => {
    const { result } = renderHook(() => useShareSelection(undefined))

    expect(result.current.isAllSelected).toBe(false)
    expect(result.current.isIndeterminate).toBe(false)

    act(() => result.current.selectAll())
    expect(result.current.getSelectedItems()).toEqual([])
  })
})
