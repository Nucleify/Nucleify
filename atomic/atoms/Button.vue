<template>
    <Button
        :label="props.label"
        :icon="props.icon"
        :icon-pos="props.iconPos"
        :icon-class="props.iconClass"
        :badge="props.badge"
        :badge-class="props.badgeClass"
        :badge-severity="props.badgeSeverity"
        :loading="props.loading"
        :loading-icon="props.loadingIcon"
        :link="props.link"
        :severity="props.severity"
        :raised="props.raised"
        :rounded="props.rounded"
        :text="props.text"
        :outlined="props.outlined"
        :disabled="props.disabled"
        :pt="props.pt"
        :pt-options="props.ptOptions"
        :type="props.type"
        @click="props.onclick"
        :style="{
            width: props.width,
            gap: props.gap,
            padding: props.padding,
        }"
        :v-type="props.type"
    >
        <image-atom v-if="props.src" :src="props.src" />
        <slot />
    </Button>
</template>

<script setup lang="ts">
import { ButtonInterface } from 'atomic/bosons/types'

const props = defineProps<ButtonInterface>()
</script>
