<template>
  <section id="charts">
    <div class="home-charts-container">
      <ad-paragraph
        class="home-charts-header"
        :text="t('home.charts.paragraph')"
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

const { t } = useI18n()

</script>
