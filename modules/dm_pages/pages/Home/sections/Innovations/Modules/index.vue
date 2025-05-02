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
                asChild
                :value="module.value"
              >
                <div
                  class="cube"
                  :class="module.icon"
                  v-bind="a11yAttrs.root"
                  @click="activateCallback"
                ></div>
              </Step>
            </swiper-slide>
            <swiper-slide>
              <Step v-slot="{ activateCallback, a11yAttrs }" asChild :value="1">
                <div
                  class="cube"
                  v-bind="a11yAttrs.root"
                  @click="activateCallback"
                >
                  <img src="/img/logo.svg" alt="Logo" class="logo-img" />
                </div>
              </Step>
            </swiper-slide>
            <swiper-slide
              v-for="module in modules.slice(2)"
              :key="module.value"
            >
              <Step
                v-slot="{ activateCallback, a11yAttrs }"
                asChild
                :value="module.value"
              >
                <div
                  class="cube"
                  :class="module.icon"
                  v-bind="a11yAttrs.root"
                  @click="activateCallback"
                ></div>
              </Step>
            </swiper-slide>
          </swiper-container>
        </StepList>
        <StepPanels>
          <dm-animation-hexagons />

          <StepPanel :value="1">
            <div class="step-panel-container">
              <atom-heading :tag="4" class="tech-heading">
                <span class="tech-text">We've got</span
                ><span class="tech-text highlight">modules!</span>
              </atom-heading>
              <atom-button
                label="Get started"
                class="start-button caterpillar"
                @click="
                  navigateTo(
                    'https://github.com/Atomic-IT/DataManager/tree/prod/modules'
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
                    v-html="readmeContents[module.value]"
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
import { ref, onMounted, watch } from 'vue'

import { marked } from 'marked'
import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import StepPanels from 'primevue/steppanels'
import Step from 'primevue/step'
import StepPanel from 'primevue/steppanel'

import { navigateTo, isMobile } from 'atomic'
import { modules } from './constants'

const activeStep = ref(1)
const readmeContents = ref<Record<number, string>>({})
const modulesSwiper = ref(null)

const loadReadme = async (modulePath: string, value: number) => {
  try {
    const response = await fetch(`/modules/${modulePath}/README.md`)
    if (!response.ok) {
      throw new Error('README not found')
    }
    const text = await response.text()
    const html = await marked.parse(text)
    readmeContents.value[value] = html
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
</script>
