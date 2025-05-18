<template>
  <section id="charts">
    <div class="home-charts-container">
      <atom-heading
        :tag="5"
        class="home-charts-header"
        text="Choose from bar charts, line graphs, pie charts and more to best represent your data."
      />
      <organism-card class="my-card home-chart-card">
        <template #content>
          <DeferredContent>
            <dm-animation-hexagons style="opacity: 0.3" />
            <organism-chart
              chart-method-type="annual"
              type="bar"
              chart-class="home-vertical-chart"
              :direction="isMobile() ? 'horizontal' : 'vertical'"
              :example="true"
            />
            <organism-chart
              chart-method-type="count"
              type="pie"
              chart-class="home-pie-chart"
              :example="true"
            />
          </DeferredContent>
        </template>
      </organism-card>
    </div>
  </section>
</template>

<script setup lang="ts"></script>
