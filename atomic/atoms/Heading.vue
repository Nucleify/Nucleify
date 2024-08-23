<template>
    <component :is="chooseHeading(props.tag)">
        {{ text }}
        <slot />
    </component>
</template>

<script setup lang="ts">
import { HeadingInterface } from 'atomic/bosons/types'
import { chooseHeading } from 'atomic/bosons/utils'

const props = defineProps<HeadingInterface>()
</script>
