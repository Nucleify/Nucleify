<template>
  <div
    class="flip-card col-12 md:col-6 xl:col-4"
    @mouseenter="animate(`.flip-card .flip-card-back p`)"
    @mouseleave="deconstruct(`.flip-card .flip-card-back p`)"
  >
    <div class="flip-card-inner">
      <nuc-animation-hexagons />
      <div class="flip-card-front">
        <ad-image
          :src="props.frontImage"
          :width="props.frontImageWidth"
          :height="props.frontImageHeight"
          :alt="props.frontImageAlt"
          class="flip-card-image"
        />
        <ad-heading
          :tag="3"
          :text="props.frontTitle"
          class="flip-card-header"
        />
      </div>
      <div class="flip-card-back">
        <ad-paragraph
          :class="props.backContentClass"
          :text="props.backContent"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSplitText } from 'atomic'

import type { NucFlipCardInterface } from './types'

const props = defineProps<NucFlipCardInterface>()

const { animate, deconstruct } = useSplitText()
</script>
