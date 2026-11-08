<template>
  <div
    class="nuc-holo-cube"
    :class="{
      'is-compact': compact,
      'is-paused': paused,
      'is-focus-ui': focus === 'ui',
      'is-focus-sdk': focus === 'sdk',
      'is-focus-data': focus === 'data',
    }"
  >
    <div class="nuc-holo-cube-spin">
      <div class="nuc-holo-cube-aura" aria-hidden="true" />
      <svg class="nuc-holo-cube-bloom" viewBox="0 0 200 188" aria-hidden="true">
        <defs>
          <!--
            userSpaceOnUse: a lone vertical stroke has ~0 bbox width, so
            objectBoundingBox filter regions collapse and kill the bloom.
          -->
          <filter
            :id="`${uid}-bloom`"
            filterUnits="userSpaceOnUse"
            x="-40"
            y="-40"
            width="280"
            height="280"
            color-interpolation-filters="sRGB"
          >
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <clipPath :id="`${uid}-glow-left`">
            <rect x="0" y="0" width="100" height="188" />
          </clipPath>
          <clipPath :id="`${uid}-glow-right`">
            <rect x="100" y="0" width="100" height="188" />
          </clipPath>
          <!-- Underside of front Y arms = side faces -->
          <clipPath :id="`${uid}-face-left`">
            <path d="M38 68 L100 102 L100 170 L38 136 Z" />
          </clipPath>
          <clipPath :id="`${uid}-face-right`">
            <path d="M162 68 L100 102 L100 170 L162 136 Z" />
          </clipPath>
          <clipPath :id="`${uid}-face-top`">
            <path d="M100 34 L162 68 L100 102 L38 68 Z" />
          </clipPath>
        </defs>
        <g
          fill="none"
          stroke-linecap="butt"
          stroke-linejoin="miter"
          stroke-miterlimit="8"
          :filter="`url(#${uid}-bloom)`"
        >
          <path class="is-ui" d="M38 68 L100 34 L162 68" />
          <!-- Left/right verticals -->
          <path class="is-sdk" d="M38 68 L38 136" />
          <path class="is-data" d="M162 68 L162 136" />
          <!-- Bottom rim: TL-side → secondary, TR-side → tertiary -->
          <path class="is-bottom-left" d="M38 136 L100 170" />
          <path class="is-bottom-right" d="M162 136 L100 170" />
        </g>
        <!-- Y-arm main bloom only on top face — not spilling under into side faces -->
        <g :clip-path="`url(#${uid}-face-top)`">
          <g fill="none" stroke-linecap="butt" :filter="`url(#${uid}-bloom)`">
            <path class="is-mid" d="M38 68 L100 102" />
            <path class="is-lo" d="M162 68 L100 102" />
          </g>
        </g>
        <!-- Y-arm underside glow: secondary left / tertiary right; stroke stays main -->
        <g :clip-path="`url(#${uid}-face-left)`">
          <g fill="none" stroke-linecap="butt" :filter="`url(#${uid}-bloom)`">
            <path class="is-mid-under" d="M38 68 L100 102" />
          </g>
        </g>
        <g :clip-path="`url(#${uid}-face-right)`">
          <g fill="none" stroke-linecap="butt" :filter="`url(#${uid}-bloom)`">
            <path class="is-lo-under" d="M162 68 L100 102" />
          </g>
        </g>
        <!-- Mild overshoot only — enough for corner fill, not past the tip -->
        <g :clip-path="`url(#${uid}-glow-left)`">
          <g fill="none" stroke-linecap="butt" :filter="`url(#${uid}-bloom)`">
            <path class="is-spine-sec" d="M100 98 L100 172" />
          </g>
        </g>
        <g :clip-path="`url(#${uid}-glow-right)`">
          <g fill="none" stroke-linecap="butt" :filter="`url(#${uid}-bloom)`">
            <path class="is-spine-tert" d="M100 98 L100 172" />
          </g>
        </g>
      </svg>

      <svg class="nuc-holo-cube-solid" viewBox="0 0 200 188" aria-hidden="true">
        <defs>
          <radialGradient :id="`${uid}-g`" cx="58%" cy="58%" r="52%">
            <stop
              offset="0%"
              style="stop-color: hsl(var(--rainbow-hue) 55% 22%); stop-opacity: 0.42"
            />
            <stop
              offset="55%"
              style="stop-color: hsl(calc(var(--rainbow-hue) + 38deg) 45% 14%); stop-opacity: 0.28"
            />
            <stop
              offset="100%"
              style="stop-color: hsl(calc(var(--rainbow-hue) + 140deg) 40% 10%); stop-opacity: 0.12"
            />
          </radialGradient>
          <clipPath :id="`${uid}-c`">
            <path d="M100 34 L162 68 L162 136 L100 170 L38 136 L38 68 Z" />
          </clipPath>
          <linearGradient
            :id="`${uid}-top`"
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
          >
            <stop
              offset="0%"
              style="stop-color: hsl(var(--rainbow-hue) 90% 52%); stop-opacity: 0.28"
            />
            <stop
              offset="100%"
              style="stop-color: hsl(var(--rainbow-hue) 70% 28%); stop-opacity: 0.1"
            />
          </linearGradient>
          <linearGradient
            :id="`${uid}-left`"
            x1="0%"
            y1="30%"
            x2="100%"
            y2="80%"
          >
            <stop
              offset="0%"
              style="stop-color: hsl(calc(var(--rainbow-hue) + 38deg) 85% 52%); stop-opacity: 0.24"
            />
            <stop
              offset="100%"
              style="stop-color: hsl(calc(var(--rainbow-hue) + 38deg) 65% 26%); stop-opacity: 0.1"
            />
          </linearGradient>
          <linearGradient
            :id="`${uid}-right`"
            x1="100%"
            y1="20%"
            x2="0%"
            y2="90%"
          >
            <stop
              offset="0%"
              style="stop-color: hsl(calc(var(--rainbow-hue) + 140deg) 90% 52%); stop-opacity: 0.22"
            />
            <stop
              offset="100%"
              style="stop-color: hsl(calc(var(--rainbow-hue) + 140deg) 65% 26%); stop-opacity: 0.08"
            />
          </linearGradient>
        </defs>

        <!-- No blur+clip — that soft-cuts the fill short of the wire -->
        <path
          class="nuc-holo-cube-glob"
          :fill="`url(#${uid}-g)`"
          :clip-path="`url(#${uid}-c)`"
          d="M100 34 L162 68 L162 136 L100 170 L38 136 L38 68 Z"
        />

        <g
          class="nuc-holo-cube-back"
          fill="none"
          stroke-linecap="butt"
          stroke-linejoin="miter"
          stroke-miterlimit="8"
        >
          <path class="nuc-holo-cube-back-edge is-main" d="M100 34 L100 102" />
          <path class="nuc-holo-cube-back-edge is-sec" d="M38 136 L100 102" />
          <path class="nuc-holo-cube-back-edge is-tert" d="M162 136 L100 102" />
        </g>

        <g stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="8">
          <path
            class="nuc-holo-cube-face is-ui"
            :fill="`url(#${uid}-top)`"
            d="M100 34 L162 68 L100 102 L38 68 Z"
          />
          <path
            class="nuc-holo-cube-face is-sdk"
            :fill="`url(#${uid}-left)`"
            d="M38 68 L100 102 L100 170 L38 136 Z"
          />
          <path
            class="nuc-holo-cube-face is-data"
            :fill="`url(#${uid}-right)`"
            d="M162 68 L100 102 L100 170 L162 136 Z"
          />
          <path class="nuc-holo-cube-rim is-top" d="M38 68 L100 34 L162 68" />
          <path class="nuc-holo-cube-rim is-left" d="M38 68 L38 136" />
          <path class="nuc-holo-cube-rim is-right" d="M162 68 L162 136" />
          <path class="nuc-holo-cube-rim is-bottom-left" d="M38 136 L100 170" />
          <path
            class="nuc-holo-cube-rim is-bottom-right"
            d="M162 136 L100 170"
          />
          <path class="nuc-holo-cube-near is-mid" d="M38 68 L100 102" />
          <path class="nuc-holo-cube-near is-lo" d="M162 68 L100 102" />
          <path class="nuc-holo-cube-near is-hi" d="M100 102 L100 170" />
        </g>
      </svg>
    </div>

    <div class="nuc-holo-cube-hits">
      <button
        v-for="face in faces"
        :key="face.id"
        type="button"
        class="nuc-holo-cube-hit"
        :class="[`is-${face.id}`, { 'is-focus': focus === face.id }]"
        :aria-pressed="focus === face.id"
        :aria-label="face.label"
        @click="$emit('focus', face.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'

import type { NucHomeModuleLaneId } from '@web'

defineProps<{
  focus: NucHomeModuleLaneId
  compact?: boolean
  paused?: boolean
  faces: Array<{ id: NucHomeModuleLaneId; label: string }>
}>()

defineEmits<{
  focus: [id: NucHomeModuleLaneId]
}>()

const uid = `h${useId().replace(/[^a-zA-Z0-9]/g, '')}`
</script>

<style lang="scss" scoped>
@import 'index';
</style>
