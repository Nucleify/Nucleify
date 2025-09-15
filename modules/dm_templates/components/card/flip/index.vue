<template>
  <div class="flip-card-container">
    <div
      class="flip-card col-12 md:col-6 xl:col-4"
      @mouseenter="animate(`.flip-card .flip-card-back p`)"
      @mouseleave="deconstruct(`.flip-card .flip-card-back p`)"
    >
      <div class="flip-card-inner">
        <dm-animation-hexagons />
        <div class="flip-card-front">
          <ad-image
            :src="props.frontImage"
            :width="props.frontImageWidth || '122px'"
            :height="props.frontImageHeight || '92px'"
            :alt="props.frontImageAlt || 'Card image'"
            class="flip-card-image"
          />
          <ad-heading
            :tag="3"
            :text="props.frontTitle || 'Card Title'"
            class="flip-card-header"
          />
        </div>
        <div class="flip-card-back">
          <ad-paragraph
            :class="props.backContentClass || 'flip-card-back-text mt-2'"
            :text="
              props.backContent || 'Card description content goes here.'
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSplitText } from 'atomic'

import type { DmFlipCardInterface } from './types'

const props = defineProps<DmFlipCardInterface>()

const { animate, deconstruct } = useSplitText()
</script>
