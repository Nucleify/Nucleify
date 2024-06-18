<template>
    <ColorPicker v-model="itemColor" />
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'

import { useColorPicker } from '@/utils'

const props = defineProps<{
    item: string
}>()

const { itemColor, setColorValues } = useColorPicker(props.item)

watchEffect(setColorValues)
</script>
