import { gsap } from 'gsap'
import { onBeforeUnmount, onMounted } from 'vue'

import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useScrollTrigger(
  triggerSelector: string,
  animationFn: () => void,
  options: Partial<ScrollTrigger.Vars> = {},
  fadeTarget: gsap.TweenTarget | null = null
) {
  let scrollTriggerInstance: ScrollTrigger | null = null

  onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)
    scrollTriggerInstance = ScrollTrigger.create({
      trigger: triggerSelector,
      onEnter: () => {
        animationFn()
        gsap.to(fadeTarget, {
          opacity: 1,
        })
      },
      ...options,
      once: true,
    })
  })

  onBeforeUnmount(() => {
    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill()
      scrollTriggerInstance = null
    }
  })
}
