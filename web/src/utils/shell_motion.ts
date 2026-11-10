import { isAutomatedAudit } from './is_lab'

import type { animate as AnimeAnimate, TweenParamValue } from 'animejs'

export type Revertible = {
  revert?: () => unknown
  pause?: () => unknown
  cancel?: () => unknown
}

export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function isQuietBoot(): boolean {
  return prefersReducedMotion() || isAutomatedAudit()
}

export function q(root: HTMLElement, selector: string): HTMLElement | null {
  return root.querySelector(selector)
}

export function qa(root: HTMLElement, selector: string): HTMLElement[] {
  return Array.from(root.querySelectorAll(selector))
}

export const WIPE_SHIFT = -28
export const WIPE_SKEW = -10

const CIPHER_GLYPHS = '01<>{}[]/\\|#$%#_entropynucleus'

/** Cards with border glow - CSS mask clips box-shadow and chops 1px borders. */
function isChromeCard(item: HTMLElement): boolean {
  const shadow = getComputedStyle(item).boxShadow
  return Boolean(shadow && shadow !== 'none')
}

export function prepareFadeWipe(item: HTMLElement): void {
  item.style.opacity = '0'
  item.style.transform = `translate3d(${WIPE_SHIFT}px, 0, 0) skewX(${WIPE_SKEW}deg)`
  item.style.removeProperty('clip-path')
  item.style.removeProperty('filter')
  item.style.removeProperty('box-shadow')

  if (isChromeCard(item)) {
    item.classList.remove('nuc-anim-mask')
    item.style.removeProperty('--shell-wipe')
    item.style.transition = 'none'
    return
  }

  item.classList.add('nuc-anim-mask')
  item.style.setProperty('--shell-wipe', '0')
}

export function fadeWipeAnimation(duration: number, delay: TweenParamValue) {
  return {
    '--shell-wipe': [0, 1],
    opacity: [0, 1],
    x: [WIPE_SHIFT, 0],
    skewX: [WIPE_SKEW, 0],
    duration,
    delay,
    ease: 'outExpo' as const,
  }
}

export function clearFadeWipe(item: HTMLElement): void {
  item.classList.remove('nuc-anim-mask')
  item.style.removeProperty('--shell-wipe')
  item.style.removeProperty('--shell-wipe-l')
  item.style.removeProperty('--shell-wipe-r')
  item.style.removeProperty('mask-image')
  item.style.removeProperty('-webkit-mask-image')
  item.style.clipPath = 'none'
  item.style.filter = 'none'
  item.style.transform = 'none'
  item.style.opacity = '1'
  item.style.removeProperty('box-shadow')
  item.style.removeProperty('transition')
}

export function track(
  cleanups: Array<() => void>,
  item: Revertible | null | undefined
): void {
  if (!item) return
  cleanups.push(() => {
    try {
      item.pause?.()
      item.cancel?.()
      item.revert?.()
    } catch {
      /* noop */
    }
  })
}

export function setVar(el: HTMLElement, name: string, value: string): void {
  el.style.setProperty(name, value)
}

/** CSS defaults only - no layout reads (avoids boot forced reflow). */
export function setIrisOrigin(root: HTMLElement, compact: boolean): void {
  const origin = compact ? { x: '12%', y: '18%' } : { x: '18%', y: '40%' }
  setVar(root, '--shell-iris-x', origin.x)
  setVar(root, '--shell-iris-y', origin.y)
}

export type OpenShellIrisOptions = {
  compact?: boolean
  /** Override open delay; default compact 40 / desktop 80. */
  delayMs?: number
  /** When false, leave iris origin CSS vars alone (page owns them). */
  setOrigin?: boolean
}

export function setIrisRadius(root: HTMLElement, value: string): void {
  setVar(root, '--shell-iris', value)
}

/** Iris wipe 0→165% when `html.nuc-iris-boot`; otherwise open immediately. */
export function openShellIris(
  root: HTMLElement,
  cleanups: Array<() => void>,
  options: OpenShellIrisOptions = {}
): boolean {
  const compact = options.compact ?? false
  if (options.setOrigin !== false) setIrisOrigin(root, compact)

  const irisBoot = document.documentElement.classList.contains('nuc-iris-boot')
  if (irisBoot) {
    // Force a 0% paint with transition armed, then open (classic wipe).
    setIrisRadius(root, '0%')
    void root.offsetWidth
    const delay = options.delayMs ?? (compact ? 40 : 80)
    const irisOpenTimer = window.setTimeout(() => {
      setIrisRadius(root, '165%')
    }, delay)
    cleanups.push(() => window.clearTimeout(irisOpenTimer))
  } else {
    setIrisRadius(root, '165%')
  }
  return irisBoot
}

export function clearMotionStyles(el: HTMLElement | null | undefined): void {
  if (!el) return
  el.style.removeProperty('opacity')
  el.style.removeProperty('filter')
  el.style.removeProperty('transform')
  el.style.removeProperty('clip-path')
  el.style.removeProperty('--shell-wipe')
  el.style.removeProperty('--shell-wipe-l')
  el.style.removeProperty('--shell-wipe-r')
  el.style.removeProperty('mask-image')
  el.style.removeProperty('-webkit-mask-image')
  el.style.removeProperty('translate')
  el.style.removeProperty('rotate')
  el.style.removeProperty('scale')
  el.classList.remove('nuc-anim-mask', 'nuc-anim-lattice')
}

export function settleHeroBits(items: HTMLElement[]): void {
  for (const item of items) {
    clearMotionStyles(item)
    item.style.opacity = '1'
  }
}

/** Kick font fetch without blocking (non-boot callers). */
export function warmBrandFonts(): void {
  void awaitBrandFonts(400)
}

/** Resolve when JetBrains Mono is ready, or after timeout (slow 3G). */
export async function awaitBrandFonts(timeoutMs = 1200): Promise<boolean> {
  if (typeof document === 'undefined' || !document.fonts?.load) return false
  try {
    let ready = false
    await Promise.race([
      Promise.all([
        document.fonts.load("700 4rem 'JetBrains Mono'"),
        document.fonts.load("600 4rem 'JetBrains Mono'"),
      ]).then(() => {
        ready = true
      }),
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, timeoutMs)
      }),
    ])
    return ready
  } catch {
    return false
  }
}

export type CipherDecodeOptions = {
  target: HTMLElement
  text: string
  cleanups: Array<() => void>
  animate: typeof AnimeAnimate
  glyphClass?: string
  durationBase?: number
  durationStep?: number
  delayBase?: number
  delayStep?: number
  settleMs?: number
  /**
   * When set, start after double-rAF + this many ms (home/pitch).
   * When null/undefined, start immediately (thank-you).
   */
  deferStartMs?: number | null
}

export function playCipherDecode(options: CipherDecodeOptions): void {
  const {
    target,
    text,
    cleanups,
    animate,
    glyphClass = 'nuc-hero-glyph',
    durationBase = 780,
    durationStep = 60,
    delayBase = 160,
    delayStep = 48,
    settleMs = 1600,
    deferStartMs = null,
  } = options

  const startCipher = () => {
    target.classList.add('is-decoding')
    target.setAttribute('aria-label', text)
    target.textContent = ''

    let lockedCount = 0
    let settled = false
    const settle = () => {
      if (settled) return
      settled = true
      target.classList.remove('is-decoding')
    }

    const lockGlyph = (slot: HTMLSpanElement, char: string) => {
      if (slot.classList.contains('is-locked')) return
      slot.textContent = char === ' ' ? '\u00a0' : char
      slot.classList.add('is-locked')
      lockedCount += 1
      if (lockedCount >= text.length) settle()
    }

    text.split('').forEach((char, index) => {
      const slot = document.createElement('span')
      slot.className = glyphClass
      slot.textContent =
        CIPHER_GLYPHS[Math.floor(Math.random() * CIPHER_GLYPHS.length)] || '·'
      target.appendChild(slot)

      const state = { p: 0 }
      track(
        cleanups,
        animate(state, {
          p: 1,
          duration: durationBase + index * durationStep,
          delay: delayBase + index * delayStep,
          ease: 'outExpo',
          onUpdate: () => {
            if (state.p > 0.86) {
              lockGlyph(slot, char)
              return
            }
            if (slot.classList.contains('is-locked')) return
            slot.textContent =
              CIPHER_GLYPHS[Math.floor(Math.random() * CIPHER_GLYPHS.length)] ||
              '·'
          },
          onComplete: () => lockGlyph(slot, char),
        })
      )
    })

    const settleTimer = window.setTimeout(settle, settleMs)
    cleanups.push(() => {
      window.clearTimeout(settleTimer)
      settle()
    })
  }

  if (deferStartMs == null) {
    startCipher()
    return
  }

  const cipherRaf = requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const cipherDelay = window.setTimeout(startCipher, deferStartMs)
      cleanups.push(() => window.clearTimeout(cipherDelay))
    })
  })
  cleanups.push(() => cancelAnimationFrame(cipherRaf))
}
