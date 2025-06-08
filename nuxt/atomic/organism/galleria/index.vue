<template>
  <Galleria
    :id="props.id"
    :value="props.value"
    :active-index="props.activeIndex"
    :full-screen="props.fullScreen"
    :visible="props.visible"
    :num-visible="props.numVisible"
    :responsive-options="props.responsiveOptions"
    :show-item-navigators="props.showItemNavigators"
    :show-thumbnail-navigators="props.showThumbnailNavigators"
    :show-item-navigators-on-hover="props.showItemNavigatorsOnHover"
    :change-item-on-indicator-hover="props.changeItemInIndicatorHover"
    :circular="props.circular"
    :auto-play="props.autoPlay"
    :transition-interval="props.transitionInterval"
    :show-thumbnails="props.showThumbnails"
    :thumbnails-position="props.thumbnailsPosition"
    :vertical-thumbnail-view-port-height="props.verticalThumbnailViewPortHeight"
    :show-indicators="props.showIndicators"
    :show-indicators-on-item="props.showIndicatorsOnItem"
    :indicators-position="props.indicatorsPosition"
    :base-z-index="props.baseZIndex"
    :mask-class="props.maskClass"
    :container-style="props.containerStyle"
    :container-class="props.containerClass"
    :container-props="props.containerProps"
    :prev-button-props="props.prevButtonProps"
    :next-button-props="props.nextButtonProps"
    :aria-label="props.ariaLabel"
    :aria-roledescription="props.ariaRoledescription"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  >
    <template #item="item">
      <div>
        <img :src="item.itemImageSrc" :alt="item.alt" />
      </div>
    </template>
    <template #thumbnail="item">
      <img :src="item.thumbnailImageSrc" :alt="item.alt" />
    </template>
  </Galleria>
</template>

<script setup lang="ts">
import type { GalleriaInterface } from 'atomic'

const props = defineProps<GalleriaInterface>()
</script>
