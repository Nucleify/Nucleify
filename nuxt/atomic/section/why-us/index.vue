<template>
  <section id="why-us">
    <div class="section-header">
      <span>Why </span>
      <span>Us?</span>
    </div>
    <div class="viewport-box">
      <div class="main-circle"></div>
    </div>
    <Dialog
      v-model:visible="dialogVisible"
      :data="dialogData"
      @close="dialogVisible = false"
      :dismissable-mask="true"
      modal
      class="why-us-dialog"
    >
      <template #header>
        <atom-icon :icon="dialogData.icon" class="text-xl" />
        <atom-heading :tag="4" :text="dialogData.header" />
      </template>
      <template #default>
        <atom-paragraph :text="dialogData.description" />
      </template>
    </Dialog>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, watchEffect } from 'vue'
import { WhyUsInterface, WhyUsItemInterface, featureRequests } from 'atomic'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'
import { InertiaPlugin } from 'gsap/InertiaPlugin'

gsap.registerPlugin(Draggable)
gsap.registerPlugin(InertiaPlugin)

const props = defineProps<WhyUsInterface>()

let data
let clickOutsideHandler: ((event: MouseEvent) => void) | null = null

if (appEnv() !== 'production') {
  const { getSiteFeatures, resultsBySite } = featureRequests()
  onMounted(() => getSiteFeatures(props.site, false))
  watchEffect(() => {
    data = resultsBySite
  })
} else {
  ;({ data } = await useFetch(
    apiUrl() + `features/get-site-features/${props.site}`,
    {
      method: 'GET',
      immediate: true,
      watch: false,
    }
  ))
}

const dialogVisible = ref(false)
const dialogData = ref<WhyUsItemInterface | null>(null)

const openDialog = (item: WhyUsItemInterface) => {
  dialogData.value = item
  dialogVisible.value = true
}

watchEffect(() => {
  if (process.client) {
    const circle = document.querySelector('.main-circle')
    if (!circle || !data?.value?.length) return

    const items = data.value

    function placeItems(items: WhyUsItemInterface[]) {
      const angleIncrement = (Math.PI * 2) / items.length
      const outerRadius = circle.offsetWidth / 2
      const innerRadius = outerRadius * 0.9
      const center = outerRadius
      const elements: HTMLElement[] = []

      items.forEach((item, i) => {
        const angle = angleIncrement * i
        const radius = i % 2 === 0 ? outerRadius : innerRadius

        const el = document.createElement('div')
        el.classList.add('circle-item')

        if (item.icon) {
          const icon = document.createElement('i')
          icon.className = 'pi pi-' + item.icon
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
        circle.appendChild(el)
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
    let spin = gsap
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
        const angle = this.rotation % 360 + 360
        spin.progress(angle / 360)
        counterRotateItems(elements, angle)
      },

      onThrowUpdate() {
        const angle = this.rotation % 360 + 360
        spin.progress(angle / 360)
        counterRotateItems(elements, angle)
      },

      onThrowComplete() {
        spin.play()
      },
    })

    const scrollHeight =
      document.documentElement.scrollHeight - window.innerHeight

    window.addEventListener('scroll', () => {
      const scrollProgress = window.scrollY / scrollHeight
      const currentProgress = spin.progress()

      let targetProgress = (currentProgress + scrollProgress) / 2

      gsap.to(spin, {
        progress: targetProgress,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    })

    watch(
      () => dialogVisible.value,
      () => spin.play()
    )
  }
})

onBeforeUnmount(() => {
  if (process.client) {
    const draggable = Draggable.get('.main-circle')
    draggable?.kill()
    gsap.killTweensOf('.main-circle')

    if (clickOutsideHandler) {
      document.removeEventListener('click', clickOutsideHandler)
    }
  }
})
</script>
