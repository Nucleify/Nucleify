<template>
    <section id="charts">
        <div class="home-charts-container" v-animateonscroll="{ enterClass: 'fadein', leaveClass: 'fadeout', rootMargin: isMobile() ? '200px' : '' }">
            <heading-atom
                :tag="5"
                class="home-charts-header"
                text="Choose from bar charts, line graphs, pie charts and more to best represent your data."
            />
            <Card unstyled class="my-card home-chart-card">
                <template #content>
                    <DeferredContent>
                        <chart-organism
                            chart-method-type="annual"
                            type="bar"
                            chart-class="home-vertical-chart"
                            direction="'vertical'"
                            :example="true"
                        />
                        <chart-organism
                            :chart-method-type="'count'"
                            :type="'pie'"
                            :chart-class="'home-pie-chart'"
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
