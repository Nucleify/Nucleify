import { it, expect, beforeEach, afterEach } from 'vitest'

import { isMobile } from 'atomic/bosons/utils'

beforeEach((): void => {
    Object.defineProperty(window.screen, 'width', {
        configurable: true,
        writable: true,
    })
})

afterEach((): void => {
    delete window.screen.width
})

it('returns true for screen width less than or equal to 992', (): void => {
    window.screen.width = 992
    expect(isMobile()).toBe(true)

    window.screen.width = 800
    expect(isMobile()).toBe(true)
})

it('returns false for screen width greater than 992', (): void => {
    window.screen.width = 1200
    expect(isMobile()).toBe(false)
})
