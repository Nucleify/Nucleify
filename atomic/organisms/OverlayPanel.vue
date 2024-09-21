<template>
    <button-atom
        @click="toggle"
        :src="props.src"
        :class="buttonClass"
        :style="buttonStyle"
        type="main"
        rounded
    >
        <svg
            v-if="!props.src"
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 225.000000 225.000000"
            preserveAspectRatio="xMidYMid meet"
        >
            <g
                transform="translate(0.000000,225.000000) scale(0.100000,-0.100000)"
                fill="#000000"
                stroke="none"
            >
                <path
                    d="M49 1811 c-27 -26 -49 -56 -49 -67 0 -11 113 -132 275 -294 l275
        -275 -275 -275 c-151 -151 -275 -282 -275 -290 0 -23 92 -110 115 -110 28 0
        675 648 675 675 0 23 -657 685 -679 685 -8 0 -36 -22 -62 -49z"
                />
                <path
                    d="M878 559 c-14 -8 -18 -24 -18 -77 0 -40 5 -73 12 -80 9 -9 174 -12
        679 -12 594 0 669 2 683 16 11 10 16 34 16 74 0 40 -5 64 -16 74 -14 14 -89
        16 -677 16 -431 -1 -668 -4 -679 -11z"
                />
            </g>
        </svg>
    </button-atom>

    <OverlayPanel
        ref="op"
        :dismissable="props.dismissable"
        :show-close-icon="props.showCloseIcon"
        :append-to="props.appendTo"
        :base-z-index="props.baseZIndex"
        :auto-z-index="props.autoZIndex"
        :breakpoints="props.breakpoints"
        :pt="props.pt"
        :pt-options="props.ptOptions"
        :unstyled="props.unstyled"
        :closeOnEscape="props.closeOnEscape"
        :class="overlayPanelClass"
    >
        <slot />
    </OverlayPanel>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { OverlayPanelInterface } from 'atomic/bosons/types'

const props = defineProps<OverlayPanelInterface>()

const op = ref()

const toggle = (event) => {
    op.value.toggle(event)
}
</script>
