<template>
  <section id="why-us">
    <div class="section-header">
      <span>Why </span>
      <span>Us?</span>
    </div>
    <div class="viewport-box">
      <div class="main-circle"></div>
    </div>
    <ad-dialog
      v-model:visible="dialogVisible"
      class="why-us-dialog"
      :dismissable-mask="true"
      :draggable="false"
      @close="dialogVisible = false"
    >
      <template #header>
        <ad-icon :icon="dialogData?.icon" class="text-xl" />
        <ad-heading :tag="4" :text="dialogData?.header" />
      </template>
      <template #default>
        <ad-paragraph :text="dialogData?.description" />
      </template>
    </ad-dialog>
  </section>
</template>

<script setup lang="ts">
import { gsap } from 'gsap'
import {
  type App,
  createApp,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
  watchEffect,
} from 'vue'

import type {
  EntityResultsType,
  NucFeatureObjectInterface,
  NucSectionWhyUsInterface,
  NucSectionWhyUsItemInterface,
} from 'atomic'
import {
  AdIcon,
  bounceFadeIn,
  featureRequests,
  useScrollTrigger,
  useSplitText,
} from 'atomic'

import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'

gsap.registerPlugin(Draggable)
gsap.registerPlugin(InertiaPlugin)

const props = defineProps<NucSectionWhyUsInterface>()

const data = ref<EntityResultsType<NucFeatureObjectInterface> | null>(null)

const clickOutsideHandler: ((event: MouseEvent) => void) | null = null

const { getSiteFeatures, resultsBySite } = featureRequests()

onMounted(() => {
  getSiteFeatures(props.site, false)
})
watchEffect(() => {
  data.value = resultsBySite.value
})

const dialogVisible = ref(false)
const dialogData = ref<NucSectionWhyUsItemInterface | null>(null)
const iconApps = ref<App<Element>[]>([])

const openDialog = (item: NucSectionWhyUsItemInterface) => {
  dialogData.value = item
  dialogVisible.value = true
}

watchEffect(() => {
  if (import.meta.client) {
    const circle = document.querySelector('.main-circle')
    if (!circle || !data?.value?.length) return

    const items = data.value

    function placeItems(items: NucSectionWhyUsItemInterface[]) {
      const angleIncrement = (Math.PI * 2) / items.length
      const outerRadius = (circle as HTMLElement).offsetWidth / 2
      const innerRadius = outerRadius * 0.9
      const center = outerRadius
      const elements: HTMLElement[] = []

      items.forEach((item, i) => {
        const angle = angleIncrement * i
        const radius = i % 2 === 0 ? outerRadius : innerRadius

        const el = document.createElement('div')
        el.classList.add('circle-item')

        if (item.icon) {
          const icon = document.createElement('div')
          icon.classList.add('icon-container')
          icon.classList.add('cube')

          const iconApp = createApp({
            components: {
              AdIcon,
            },
            render() {
              return h(AdIcon, {
                icon: item.icon,
                class: 'iconify',
              })
            },
          })

          iconApp.mount(icon)
          iconApps.value.push(iconApp)
          el.appendChild(icon)
        }

        const xPos = center + Math.cos(angle) * radius
        const yPos = center + Math.sin(angle) * radius

        gsap.set(el, {
          position: 'absolute',
          top: 0,
          left: 0,
          xPercent: -50,
          yPercent: -50,
          transformOrigin: '50% 50%',
          x: xPos,
          y: yPos,
          cursor: 'pointer',
          userSelect: 'none',
          pointerEvents: 'auto',
        })

        el.addEventListener('click', () => openDialog(item))
        circle?.appendChild(el)
        elements.push(el)
      })

      return elements
    }

    function counterRotateItems(elements: HTMLElement[], angle: number) {
      elements.forEach((el) => {
        gsap.set(el, {
          rotation: -angle,
        })
      })
    }
    const elements = placeItems(items)
    const spin = gsap
      .timeline({ repeat: -1, defaults: { duration: 30, ease: 'none' } })
      .to(circle, { rotation: 360 })
      .to(elements, { rotation: -360 }, 0)

    Draggable.create(circle, {
      type: 'rotation',
      inertia: true,

      onPressInit() {
        spin.pause()
      },

      onRelease() {
        spin.play()
      },

      onDrag() {
        const angle = (this.rotation % 360) + 360
        spin.progress(angle / 360)
        counterRotateItems(elements, angle)
      },

      onThrowUpdate() {
        const angle = (this.rotation % 360) + 360
        spin.progress(angle / 360)
        counterRotateItems(elements, angle)
      },

      onThrowComplete() {
        spin.play()
      },
    })

    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollProgress = window.scrollY / scrollHeight
          const currentProgress = spin.progress()
          const targetProgress = (currentProgress / 0.4 + scrollProgress) / 4

          gsap.to(spin, {
            progress: targetProgress,
            duration: 0.5,
            ease: 'power2.out',
            overwrite: 'auto',
          })
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    watch(
      () => dialogVisible.value,
      () => spin.play()
    )
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    const draggable = Draggable.get('.main-circle')
    draggable?.kill()
    gsap.killTweensOf('.main-circle')

    iconApps.value.forEach((app) => {
      app.unmount()
    })

    iconApps.value = []

    if (clickOutsideHandler) {
      document.removeEventListener('click', clickOutsideHandler)
    }
  }
})

useSplitText().animate(
  '.section-header',
  500,
  0.2,
  0.1,
  'power2.out',
  true,
  'top 50%'
)

useScrollTrigger(
  '.section-header',
  () => {
    bounceFadeIn('.viewport-box', {
      duration: 0.3,
      ease: 'power2.out',
    })
  },
  {
    start: 'top 25%',
  }
)
</script>
