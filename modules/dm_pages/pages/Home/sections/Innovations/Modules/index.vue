<template>
  <section id="modules">
    <div class="modules-container container">
      <Stepper v-model:value="activeStep" class="basis-[40rem]">
        <StepList>
          <swiper
            :slides-per-view="6"
            :slides-per-group="3"
            :space-between="24"
            :loop="true"
            :modules="[Autoplay]"
            :autoplay="{
              delay: 10000,
            }"
            class="modules-swiper"
            :direction="isMobile() ? 'horizontal' : 'vertical'"
            :initial-slide="0"
          >
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
                  @click="
                    () => {
                      activateCallback()
                    }
                  "
                ></div>
              </Step>
            </swiper-slide>
            <swiper-slide>
              <Step v-slot="{ activateCallback, a11yAttrs }" asChild :value="1">
                <div
                  class="cube"
                  v-bind="a11yAttrs.root"
                  @click="
                    () => {
                      activateCallback()
                    }
                  "
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
                  @click="
                    () => {
                      activateCallback()
                    }
                  "
                ></div>
              </Step>
            </swiper-slide>
          </swiper>
        </StepList>
        <StepPanels>
          <dm-animation-hexagons />

          <StepPanel :value="1">
            <div class="step-panel-container">
              <ad-heading tag="4" class="tech-heading">
                <span class="tech-text">We've got <span class="highlight">modules!</span></span>
              </ad-heading>
              <ad-button
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
import { ref, watch } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay } from 'swiper/modules'

import Stepper from 'primevue/stepper'
import StepList from 'primevue/steplist'
import StepPanels from 'primevue/steppanels'
import Step from 'primevue/step'
import StepPanel from 'primevue/steppanel'

import { marked } from 'marked'

import { navigateTo } from 'atomic'
import { modules } from './constants'

const activeStep = ref(1)
const readmeContents = ref<Record<number, string>>({})
const swiperInstance = ref<SwiperType | null>(null)

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

watch(activeStep, (newValue) => {
  if (newValue > 1) {
    const module = modules.find((m) => m.value === newValue)
    if (module && !readmeContents.value[newValue]) {
      loadReadme(module.path, newValue)
    }
  }

  if (swiperInstance.value) {
    const slideIndex =
      newValue === 1 ? 0 : modules.findIndex((m) => m.value === newValue) + 1
    swiperInstance.value.slideToLoop(slideIndex, 800)
  }
})
</script>
