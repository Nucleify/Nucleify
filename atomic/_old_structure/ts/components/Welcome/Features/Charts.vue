<template>
    <div class="welcomeChartsContainer">
        <heading-atom
            :tag="5"
            class="welcomeChartsHeader"
            text="Choose from bar charts, line graphs, pie charts and more to best represent your data."
        />
        <Card unstyled class="myCard welcomeChartCard">
            <template #content>
                <my-chart
                    :chart-method-type="'annual'"
                    :type="'bar'"
                    :chart-class="'welcomeHorizontalChart'"
                    :direction="'horizontal'"
                    :example="true"
                />
                <my-chart
                    :chart-method-type="'count'"
                    :type="'pie'"
                    :chart-class="'welcomePieChart'"
                    :example="true"
                />
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { MyChart } from '@/components'
</script>
