<template>
  <div
    class="nuc-home-holo-cube"
    :class="{
      'is-compact': compact,
      'is-paused': paused,
      'is-focus-ui': focus === 'ui',
      'is-focus-sdk': focus === 'sdk',
      'is-focus-data': focus === 'data',
    }"
  >
    <div class="nuc-home-holo-cube-spin">
      <svg
        class="nuc-home-holo-cube-bloom"
        viewBox="0 0 200 188"
        aria-hidden="true"
      >
        <g fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path class="is-ui" d="M100 34 L162 68 L100 102 L38 68 Z" />
          <path class="is-sdk" d="M38 68 L100 102 L100 170 L38 136 Z" />
          <path class="is-data" d="M162 68 L100 102 L100 170 L162 136 Z" />
        </g>
      </svg>

      <svg
        class="nuc-home-holo-cube-solid"
        viewBox="0 0 200 188"
        aria-hidden="true"
      >
        <defs>
          <radialGradient :id="`${uid}-g`" cx="58%" cy="58%" r="46%">
            <stop
              offset="0%"
              stop-color="hsl(var(--rainbow-hue) 88% 68%)"
              stop-opacity="0.22"
            />
            <stop
              offset="55%"
              stop-color="hsl(calc(var(--rainbow-hue) + 48deg) 86% 58%)"
              stop-opacity="0.1"
            />
            <stop
              offset="100%"
              stop-color="hsl(calc(var(--rainbow-hue) + 96deg) 88% 54%)"
              stop-opacity="0"
            />
          </radialGradient>
          <clipPath :id="`${uid}-c`">
            <path d="M100 34 L162 68 L162 136 L100 170 L38 136 L38 68 Z" />
          </clipPath>
          <filter :id="`${uid}-b`" x="-8%" y="-8%" width="116%" height="116%">
            <feGaussianBlur stdDeviation="3.2" />
          </filter>
          <linearGradient
            :id="`${uid}-top`"
            x1="50%"
            y1="0%"
            x2="50%"
            y2="100%"
          >
            <stop
              offset="0%"
              stop-color="hsl(var(--rainbow-hue) 95% 72%)"
              stop-opacity="0.38"
            />
            <stop
              offset="100%"
              stop-color="hsl(var(--rainbow-hue) 90% 58%)"
              stop-opacity="0.12"
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
              stop-color="hsl(calc(var(--rainbow-hue) + 48deg) 90% 62%)"
              stop-opacity="0.22"
            />
            <stop
              offset="100%"
              stop-color="hsl(calc(var(--rainbow-hue) + 48deg) 80% 42%)"
              stop-opacity="0.06"
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
              stop-color="hsl(calc(var(--rainbow-hue) + 96deg) 90% 58%)"
              stop-opacity="0.14"
            />
            <stop
              offset="100%"
              stop-color="hsl(calc(var(--rainbow-hue) + 96deg) 70% 32%)"
              stop-opacity="0.04"
            />
          </linearGradient>
        </defs>

        <g :clip-path="`url(#${uid}-c)`">
          <path
            class="nuc-home-holo-cube-glob"
            :fill="`url(#${uid}-g)`"
            :filter="`url(#${uid}-b)`"
            d="M100 34 L162 68 L162 136 L100 170 L38 136 L38 68 Z"
          />
        </g>

        <g
          class="nuc-home-holo-cube-back"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path
            class="nuc-home-holo-cube-back-edge"
            d="M38 136 L100 102 L162 136 M100 34 L100 102"
          />
        </g>

        <g stroke-linecap="round" stroke-linejoin="round">
          <path
            class="nuc-home-holo-cube-face is-ui"
            :fill="`url(#${uid}-top)`"
            d="M100 34 L162 68 L100 102 L38 68 Z"
          />
          <path
            class="nuc-home-holo-cube-face is-sdk"
            :fill="`url(#${uid}-left)`"
            d="M38 68 L100 102 L100 170 L38 136 Z"
          />
          <path
            class="nuc-home-holo-cube-face is-data"
            :fill="`url(#${uid}-right)`"
            d="M162 68 L100 102 L100 170 L162 136 Z"
          />
          <path
            class="nuc-home-holo-cube-rim is-top"
            d="M38 68 L100 34 L162 68"
          />
          <path class="nuc-home-holo-cube-rim is-left" d="M38 68 L38 136" />
          <path class="nuc-home-holo-cube-rim is-right" d="M162 68 L162 136" />
          <path
            class="nuc-home-holo-cube-rim is-bottom-left"
            d="M38 136 L100 170"
          />
          <path
            class="nuc-home-holo-cube-rim is-bottom-right"
            d="M162 136 L100 170"
          />
          <path class="nuc-home-holo-cube-near is-mid" d="M38 68 L100 102" />
          <path class="nuc-home-holo-cube-near is-lo" d="M162 68 L100 102" />
          <path class="nuc-home-holo-cube-near is-hi" d="M100 102 L100 170" />
        </g>
      </svg>
    </div>

    <div class="nuc-home-holo-cube-hits">
      <button
        v-for="face in faces"
        :key="face.id"
        type="button"
        class="nuc-home-holo-cube-hit"
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

import type { NucHomeModuleLaneId } from '../../constants/content'

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
@import 'cube';
</style>
