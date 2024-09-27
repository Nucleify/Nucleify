<template>
    <section id="charts">
        <div class="homeChartsContainer" v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout', rootMargin: isMobile() ? '200px' : '' }">
            <heading-atom
                :tag="5"
                class="homeChartsHeader"
                text="Choose from bar charts, line graphs, pie charts and more to best represent your data."
            />
            <Card unstyled class="myCard homeChartCard">
                <template #content>
                    <DeferredContent>
                        <chart-organism
                            :chart-method-type="'annual'"
                            :type="'bar'"
                            :chart-class="'homeVerticalChart'"
                            :direction="'vertical'"
                            :example="true"
                        />
                        <chart-organism
                            :chart-method-type="'count'"
                            :type="'pie'"
                            :chart-class="'homePieChart'"
                            :example="true"
                        />
                    </DeferredContent>
                </template>
            </Card>
        </div>
    </section>
</template>

<script setup lang="ts">
</script>
