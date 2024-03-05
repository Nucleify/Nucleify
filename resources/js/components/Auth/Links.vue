<template>
    <a href="/" class="backLink">
        <i class="pi pi-chevron-left"></i>
    </a>
    <a v-if="isCurrentUrl('/register')" href="/login" class="loginLink">
        Log In
    </a>
    <a v-else href="/register" class="registerLink"> Register </a>
</template>

<script setup lang="ts">
import { isCurrentUrl } from '../../utils'
</script>
