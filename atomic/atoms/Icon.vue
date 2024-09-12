<template>
    <i v-if="icon" :class="icon" :v-type="type" />
</template>

<script setup lang="ts">
import { IconInterface } from 'atomic/bosons/types'

defineProps<IconInterface>()
</script>
