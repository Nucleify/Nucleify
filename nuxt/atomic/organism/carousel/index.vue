<template>
  <Carousel
    :value="props.value"
    :page="props.page"
    :num-visible="props.numVisible"
    :num-scroll="props.numScroll"
    :responsive-options="props.responsiveOptions"
    :orientation="props.orientation"
    :vertical-view-port-height="props.verticalViewPortHeight"
    :container-class="props.containerClass"
    :content-class="props.contentClass"
    :indicators-content-class="props.indicatorsContentClass"
    :circular="props.circular"
    :autoplay-interval="props.autoplayInterval"
    :show-navigators="props.showNavigators"
    :show-indicators="props.showIndicators"
    :prev-button-props="props.prevButtonProps"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import type { CarouselInterface } from 'atomic'

const props = defineProps<CarouselInterface>()
</script>
