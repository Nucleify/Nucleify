<template>
    <ad-button
        @click="toggle"
        :icon="
            props.overlayPanelClass.includes('terminal')
                ? 'pi pi-code'
                : props.icon
        "
        :src="props.src"
        :class="props.buttonClass"
        :style="props.buttonStyle"
        type="main"
        rounded
    />

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
        :class="props.overlayPanelClass"
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
