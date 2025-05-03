<template>
    <div id="default-layout">
        <dm-screen-lights :count="8" />
        <dm-screen-loader v-if="isCurrentUrl('/')" />
        <slot />
    </div>
</template>

<script setup lang="ts">
import { isCurrentUrl } from 'atomic'
</script>
