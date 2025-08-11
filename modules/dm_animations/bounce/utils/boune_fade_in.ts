import { gsap } from 'gsap'

export function bounceFadeIn(
  target: gsap.TweenTarget,
  options: Partial<gsap.TweenVars> = {}
) {
  return gsap.fromTo(
    target,
    {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.05,
      ease: 'power2.out',
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.05,
      ease: 'power2.out',
      ...options,
    }
  )
}
