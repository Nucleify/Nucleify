import { isAutomatedAudit } from '../../home/utils/is_automated_audit'

type Revertible = {
  revert?: () => unknown
  pause?: () => unknown
  cancel?: () => unknown
}

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function isQuietBoot(): boolean {
  return prefersReducedMotion() || isAutomatedAudit()
}

function setVar(root: HTMLElement, name: string, value: string): void {
  root.style.setProperty(name, value)
}

function track(cleanups: Array<() => void>, anim: Revertible): void {
  cleanups.push(() => {
    anim.pause?.()
    anim.cancel?.()
    anim.revert?.()
  })
}

/**
 * Thank-you boot: iris wipe, title cipher decode, copy/cube assemble.
 */
export async function playThankYouAnimations(
  root: HTMLElement
): Promise<() => void> {
  const cleanups: Array<() => void> = []

  const finish = () => {
    setVar(root, '--home-iris', '165%')
    root.classList.remove('nuc-home-booting')
    root.classList.add('nuc-home-ready')
  }

  if (isQuietBoot()) {
    finish()
    root.classList.add('nuc-home-static')
    return () => {
      root.classList.remove(
        'nuc-home-ready',
        'nuc-home-booting',
        'nuc-home-static'
      )
    }
  }

  root.classList.add('nuc-home-booting')
  root.classList.remove('nuc-home-ready', 'nuc-home-static')

  const compact = window.matchMedia('(max-width: 767px)').matches
  const irisBoot = document.documentElement.classList.contains('nuc-iris-boot')

  if (irisBoot) {
    setVar(root, '--home-iris', '0%')
    const irisOpenTimer = window.setTimeout(() => {
      setVar(root, '--home-iris', '165%')
    }, 40)
    cleanups.push(() => window.clearTimeout(irisOpenTimer))
  } else {
    setVar(root, '--home-iris', '165%')
  }

  const title = root.querySelector<HTMLElement>('.nuc-thank-you-title')
  const support = root.querySelector<HTMLElement>('.nuc-thank-you-support')
  const cta = root.querySelector<HTMLElement>('.nuc-thank-you-cta')
  const cube = root.querySelector<HTMLElement>('.nuc-thank-you-cube')

  for (const el of [title, support, cta, cube]) {
    if (el) el.style.opacity = '0'
  }

  try {
    const { animate, createTimeline } = await import('animejs')

    const finalTitle =
      title?.getAttribute('aria-label')?.trim() ||
      title?.textContent?.trim() ||
      'Thanks - we got it.'
    const glyphs = '01<>{}[]/\\|#$%#_entropynucleus'

    if (title && !compact) {
      title.textContent = ''
      title.setAttribute('aria-label', finalTitle)
      title.classList.add('is-decoding')

      let lockedCount = 0
      let settled = false
      const settleTitle = () => {
        if (settled) return
        settled = true
        title.classList.remove('is-decoding')
      }

      const lockGlyph = (slot: HTMLSpanElement, char: string) => {
        if (slot.classList.contains('is-locked')) return
        slot.textContent = char === ' ' ? '\u00a0' : char
        slot.classList.add('is-locked')
        lockedCount += 1
        if (lockedCount >= finalTitle.length) settleTitle()
      }

      finalTitle.split('').forEach((char, index) => {
        const slot = document.createElement('span')
        slot.className = 'nuc-thank-you-glyph'
        slot.textContent =
          glyphs[Math.floor(Math.random() * glyphs.length)] || '·'
        title.appendChild(slot)

        const state = { p: 0 }
        track(
          cleanups,
          animate(state, {
            p: 1,
            duration: 680 + index * 42,
            delay: 120 + index * 36,
            ease: 'outExpo',
            onUpdate: () => {
              if (state.p > 0.86) {
                lockGlyph(slot, char)
                return
              }
              if (slot.classList.contains('is-locked')) return
              slot.textContent =
                glyphs[Math.floor(Math.random() * glyphs.length)] || '·'
            },
            onComplete: () => lockGlyph(slot, char),
          })
        )
      })

      const settleTimer = window.setTimeout(settleTitle, 1800)
      cleanups.push(() => {
        window.clearTimeout(settleTimer)
        settleTitle()
      })
    } else if (title) {
      title.classList.remove('is-decoding')
    }

    const timeline = createTimeline({
      defaults: { ease: 'outExpo' },
      onComplete: finish,
    })

    if (title) {
      timeline.add(
        title,
        {
          opacity: [0, 1],
          duration: 420,
          delay: irisBoot ? 220 : 40,
        },
        0
      )
    }
    if (support) {
      timeline.add(
        support,
        {
          opacity: [0, 1],
          y: [14, 0],
          duration: 560,
          delay: irisBoot ? 520 : 220,
        },
        0
      )
    }
    if (cta) {
      timeline.add(
        cta,
        {
          opacity: [0, 1],
          y: [12, 0],
          duration: 520,
          delay: irisBoot ? 640 : 300,
        },
        0
      )
    }
    if (cube) {
      timeline.add(
        cube,
        {
          opacity: [0, 1],
          scale: [0.92, 1],
          duration: 700,
          delay: irisBoot ? 280 : 80,
        },
        0
      )
    }

    cleanups.push(() => {
      ;(timeline as Revertible).pause?.()
      ;(timeline as Revertible).cancel?.()
      ;(timeline as Revertible).revert?.()
    })

    const safety = window.setTimeout(finish, irisBoot ? 2200 : 1400)
    cleanups.push(() => window.clearTimeout(safety))
  } catch {
    finish()
  }

  return () => {
    for (const stop of cleanups) stop()
    root.classList.remove(
      'nuc-home-ready',
      'nuc-home-booting',
      'nuc-home-static'
    )
    for (const el of [title, support, cta, cube]) {
      el?.style.removeProperty('opacity')
      el?.style.removeProperty('transform')
    }
  }
}
