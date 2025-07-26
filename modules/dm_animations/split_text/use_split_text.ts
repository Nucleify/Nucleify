import { gsap } from 'gsap'
import { onBeforeUnmount } from 'vue'

import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText, ScrollTrigger)

export function useSplitText() {
  let splitInstances: { element: Element; instance: SplitText }[] = []
  let triggers: ScrollTrigger[] = []
  const activeSplits = new Set<Element>()

  function splitAndAnimate(
    element: Element,
    duration = 0.6,
    stagger = 0.1,
    ease = 'expo.out'
  ) {
    if (activeSplits.has(element)) return
    if (!element.classList.contains('split')) element.classList.add('split')

    const spans = element.querySelectorAll('.split span')
    const instance = SplitText.create(element, {
      type: 'words,chars',
      autoSplit: true,
    })

    gsap.set(element, { opacity: 1 })
    gsap.set(spans, { opacity: 1 })
    splitInstances.push({ element, instance })
    activeSplits.add(element)

    gsap.from(instance.words, {
      duration,
      yPercent: 70,
      opacity: 0,
      stagger,
      ease,
    })
  }

  function revertSplit(element: Element) {
    splitInstances = splitInstances.filter(({ element: e, instance }) => {
      if (e === element) {
        if (instance && instance.revert) instance.revert()
        activeSplits.delete(element)
        gsap.set(element, { opacity: 0 })
        return false
      }
      return true
    })
  }

  function animate(
    selector = '.split',
    delay = 0,
    duration = 0.6,
    stagger = 0.1,
    ease = 'expo.out',
    scrollTrigger = true,
    start = 'top 90%'
  ) {
    setTimeout(() => {
      if (import.meta.client) {
        const splits = document.querySelectorAll(selector)
        splits.forEach((element) => {
          if (scrollTrigger) {
            ScrollTrigger.create({
              trigger: element,
              start: start,
              onEnter: () => splitAndAnimate(element, duration, stagger, ease),
              onEnterBack: () =>
                splitAndAnimate(element, duration, stagger, ease),
            })
          } else {
            splitAndAnimate(element, duration, stagger, ease)
          }
        })
      }
    }, delay)
  }

  function deconstruct(selector = '.split', timeout = 0) {
    if (import.meta.client) {
      const splits =
        typeof selector === 'string'
          ? document.querySelectorAll(selector)
          : [selector]
      splits.forEach((element) => {
        setTimeout(() => {
          revertSplit(element)
        }, timeout)
      })
    }
  }

  onBeforeUnmount(() => {
    splitInstances.forEach(
      ({ instance }) => instance && instance.revert && instance.revert()
    )
    splitInstances = []
    triggers.forEach((trigger) => trigger && trigger.kill())
    triggers = []
    activeSplits.clear()
  })

  return { animate, deconstruct }
}
