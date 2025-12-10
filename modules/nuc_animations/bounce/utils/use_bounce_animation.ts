import gsap from 'gsap'

export function useBounceAnimation() {
  let ballBounce: gsap.core.Tween | null = null

  ballBounce = gsap.to('.ball', {
    keyframes: {
      '0%': { y: -50, scaleX: 1, scaleY: 1 },
      '7%': { y: -45, scaleY: 0.9, scaleX: 1.05, ease: 'sine.in' },
      '25%': { y: 5, scaleY: 1.15, scaleX: 0.9, ease: 'sine.in' },
      '50%': { y: 100, scaleX: 1, scaleY: 1, ease: 'none' },
      '60%': { scaleX: 1.3, scaleY: 0.4, ease: 'none' },
      '65%': { y: 150, scaleX: 1, scaleY: 1 },
      '100%': { y: -50, scaleX: 1, scaleY: 1 },
      easeEach: 'sine.out',
    },
    duration: 1.1,
    repeat: -1,
    transformOrigin: 'center bottom',
  })

  return { ballBounce }
}
