<template>
  <section id="charts">
    <div class="home-charts-container">
      <ad-paragraph
        class="home-charts-header"
        text="Choose from bar charts, line graphs, pie charts and more to best represent your data."
      />
      <ad-card class="my-card home-chart-card">
        <template #content>
          <DeferredContent>
            <dm-animation-hexagons style="opacity: 0.3" />
            <ad-chart
              chart-method-type="annual"
              type="bar"
              chart-class="home-vertical-chart"
              :direction="isMobile() ? 'horizontal' : 'vertical'"
              :example="true"
            />
            <ad-chart
              chart-method-type="count"
              type="pie"
              chart-class="home-pie-chart"
              :example="true"
            />
          </DeferredContent>
        </template>
      </ad-card>
    </div>
  </section>
</template>

<script setup lang="ts">
import { bounceFadeIn, useScrollTrigger, useSplitText } from 'atomic'

useSplitText().animate(
  '.home-charts-container .home-charts-header',
  800,
  0.2,
  0.05,
  'power2.out',
  true,
  'top 80%'
)

useScrollTrigger(
  '.home-chart-card',
  () => {
    bounceFadeIn('.home-chart-card', {
      delay: 0,
      duration: 0.3,
      stagger: 0.15,
      ease: 'power2.out',
    })
  },
  {
    start: 'top 70%',
  }
)
</script>
