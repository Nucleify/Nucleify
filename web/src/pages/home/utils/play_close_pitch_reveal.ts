import { isAutomatedAudit } from './is_automated_audit'

import type { TweenParamValue } from 'animejs'

const WIPE_SHIFT = -28
const WIPE_SKEW = -10

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function isChromeCard(item: HTMLElement): boolean {
  const shadow = getComputedStyle(item).boxShadow
  return Boolean(shadow && shadow !== 'none')
}

function prepareFadeWipe(item: HTMLElement): void {
  item.style.opacity = '0'
  item.style.transform = `translate3d(${WIPE_SHIFT}px, 0, 0) skewX(${WIPE_SKEW}deg)`
  item.style.removeProperty('clip-path')
  item.style.removeProperty('filter')
  item.style.removeProperty('box-shadow')

  if (isChromeCard(item)) {
    item.classList.remove('nuc-home-anim-mask')
    item.style.removeProperty('--home-wipe')
    item.style.transition = 'none'
    return
  }

  item.classList.add('nuc-home-anim-mask')
  item.style.setProperty('--home-wipe', '0')
}

function fadeWipeAnimation(duration: number, delay: TweenParamValue) {
  return {
    '--home-wipe': [0, 1],
    opacity: [0, 1],
    x: [WIPE_SHIFT, 0],
    skewX: [WIPE_SKEW, 0],
    duration,
    delay,
    ease: 'outExpo' as const,
  }
}

function clearFadeWipe(item: HTMLElement): void {
  item.classList.remove('nuc-home-anim-mask')
  item.style.removeProperty('--home-wipe')
  item.style.removeProperty('--home-wipe-l')
  item.style.removeProperty('--home-wipe-r')
  item.style.removeProperty('mask-image')
  item.style.removeProperty('-webkit-mask-image')
  item.style.clipPath = 'none'
  item.style.filter = 'none'
  item.style.transform = 'none'
  item.style.opacity = '1'
  item.style.removeProperty('box-shadow')
  item.style.removeProperty('transition')
}

function clearPitchOverrides(pitch: HTMLElement): void {
  pitch.style.removeProperty('transition')
  pitch.style.removeProperty('opacity')
  pitch.style.removeProperty('visibility')
  pitch.style.removeProperty('transform')
  pitch.style.removeProperty('pointer-events')
}

/**
 * After closing the contact form, reveal pitch copy + CTA with the same
 * fade-wipe used by section cards (skip CSS pitch fade/slide).
 */
export async function playClosePitchReveal(
  section: HTMLElement
): Promise<void> {
  if (prefersReducedMotion() || isAutomatedAudit()) return

  const pitch = section.querySelector<HTMLElement>('.nuc-home-close-pitch')
  const items = Array.from(
    section.querySelectorAll<HTMLElement>(
      '.nuc-home-close-copy, .nuc-home-close-cta'
    )
  )
  if (!pitch || items.length === 0) return

  // Own the return: no CSS pitch fade fighting the wipe.
  pitch.style.transition = 'none'
  pitch.style.opacity = '1'
  pitch.style.visibility = 'visible'
  pitch.style.transform = 'none'
  pitch.style.pointerEvents = 'auto'

  let animate: typeof import('animejs').animate
  let stagger: typeof import('animejs').stagger
  try {
    ;({ animate, stagger } = await import('animejs'))
  } catch {
    clearPitchOverrides(pitch)
    return
  }

  for (const item of items) prepareFadeWipe(item)

  await new Promise<void>((resolve) => {
    animate(items, {
      ...fadeWipeAnimation(1150, stagger(100)),
      onComplete: () => {
        for (const item of items) clearFadeWipe(item)
        clearPitchOverrides(pitch)
        resolve()
      },
    })
  })
}
