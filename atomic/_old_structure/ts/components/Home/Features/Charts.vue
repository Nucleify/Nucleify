<template>
    <div class="homeChartsContainer">
        <heading-atom
            :tag="5"
            class="homeChartsHeader"
            text="Choose from bar charts, line graphs, pie charts and more to best represent your data."
        />
        <Card unstyled class="myCard homeChartCard">
            <template #content>
                <chart-organism
                    :chart-method-type="'annual'"
                    :type="'bar'"
                    :chart-class="'homeHorizontalChart'"
                    :direction="'horizontal'"
                    :example="true"
                />
                <chart-organism
                    :chart-method-type="'count'"
                    :type="'pie'"
                    :chart-class="'homePieChart'"
                    :example="true"
                />
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
</script>
