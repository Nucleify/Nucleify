<template>
  <section id="modules">
    <div class="modules-container container">
      <Stepper v-model:value="activeStep" class="basis-[40rem]">
        <StepList>
          <swiper-container ref="modulesSwiper" class="modules-swiper">
            <swiper-slide
              v-for="module in modules.slice(0, 2)"
              :key="module.value"
            >
              <Step
                v-slot="{ activateCallback, a11yAttrs }"
                as-child
                :value="module.value"
              >
                <div class="cube" v-bind="a11yAttrs.root">
                  <ad-icon
                    :icon="module.icon"
                    @click="activateCallback"
                  />
                </div>
              </Step>
            </swiper-slide>
            <swiper-slide>
              <Step
                v-slot="{ activateCallback, a11yAttrs }"
                as-child
                :value="1"
              >
                <div
                  class="cube"
                  v-bind="a11yAttrs.root"
                  @click="activateCallback"
                >
                  <ad-logo :dimensions="40" ad-type="main" />
                </div>
              </Step>
            </swiper-slide>
            <swiper-slide
              v-for="module in modules.slice(2)"
              :key="module.value"
            >
              <Step
                v-slot="{ activateCallback, a11yAttrs }"
                as-child
                :value="module.value"
              >
                <div class="cube" v-bind="a11yAttrs.root">
                  <ad-icon
                    :icon="module.icon"
                    @click="activateCallback"
                  />  
                </div>
              </Step>
            </swiper-slide>
          </swiper-container>
        </StepList>
        <StepPanels>
          <nuc-animation-hexagons />

          <StepPanel :value="1">
            <div class="step-panel-container">
              <ad-heading :tag="4" class="tech-heading">
                <span class="tech-text">
                  Explore our&nbsp;<span class="shiny">modules!</span>
                </span>
              </ad-heading>
              <ad-button
                label="Read more"
                class="start-button caterpillar"
                @click="
                  navigateToUrl(
                    'https://github.com/Nucleify/Nucleify/tree/prod/modules'
                  )
                "
              />
            </div>
          </StepPanel>
          <StepPanel
            v-for="module in modules"
            :key="module.value"
            :value="module.value"
          >
            <div class="step-panel-container">
              <transition name="fade" mode="out-in">
                <div v-if="activeStep === module.value" class="readme-content">
                  <div
                    v-if="readmeContents[module.value]"
                    v-sanitize-html="readmeContents[module.value]"
                  ></div>
                </div>
              </transition>
            </div>
          </StepPanel>
        </StepPanels>
      </Stepper>
    </div>
  </section>
</template>

<script setup lang="ts">
import { marked } from 'marked'

import {
  apiHandle,
  bounceFadeIn,
  isMobile,
  navigateToUrl,
  useScrollTrigger,
} from 'atomic'

import { modules } from './constants'

const activeStep = ref(1)
const readmeContents = ref<Record<number, string>>({})
const modulesSwiper = ref(null)

const loadReadme = async (modulePath: string, value: number) => {
  try {
    await apiHandle({
      url: appUrl() + `/modules/${modulePath}/README.md`,
      method: 'GET',
      onSuccess: (data) => {
        const html = marked.parse(data)
        readmeContents.value[value] = html
        readmeContents.value[value] = readmeContents.value[value].replaceAll(
          '/public',
          appUrl()
        )
      },
    })
  } catch (error) {
    console.error(`Error loading README for ${modulePath}:`, error)
  }
}

useSwiper(modulesSwiper, {
  loop: true,
  autoplay: {
    delay: 10000,
  },
  direction: isMobile() ? 'horizontal' : 'vertical',
  slidesPerView: isMobile() ? 6 : 7,
  slidesPerGroup: 2,
  spaceBetween: 24,
})

watch(activeStep, (newValue) => {
  if (newValue > 1) {
    const module = modules.find((m) => m.value === newValue)
    if (module && !readmeContents.value[newValue]) {
      loadReadme(module.path, newValue)
    }
  }
})

useScrollTrigger(
  '.modules-swiper',
  () => {
    bounceFadeIn('.modules-swiper swiper-slide', {
      duration: 0.3,
      stagger: 0.15,
      ease: 'power2',
    })
    bounceFadeIn('.modules-container .p-steppanels', {
      duration: 0.3,
      stagger: 0.15,
      ease: 'power2',
    })
  },
  {
    start: 'top 50%',
  }
)
</script>
