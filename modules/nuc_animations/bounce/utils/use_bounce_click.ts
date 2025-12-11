import gsap from 'gsap'

export function useBounceClick(ballBounce: gsap.core.Tween | null) {
  const startContainer = document.querySelector('.start-container')

  if (startContainer && ballBounce) {
    startContainer.addEventListener('click', () => {
      gsap.to(ballBounce, {
        timeScale: 5,
        duration: 0.2,
        ease: 'power1.in',
        onComplete: () => {
          gsap.to(ballBounce, {
            timeScale: 1,
            duration: 0.25,
            ease: 'power2.out',
          })
        },
      })
    })
  }
}
