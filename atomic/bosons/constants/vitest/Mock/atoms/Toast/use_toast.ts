import { vi } from 'vitest'

import { MockUseToastInterface } from 'atomic/bosons/types'

export const mockUseToast: MockUseToastInterface = {
    add: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
    clear: vi.fn(),
}
