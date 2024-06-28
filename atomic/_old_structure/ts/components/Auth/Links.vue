<template>
    <anchor-tag-molecule
        href="/"
        class="backLink"
        icon="pi pi-chevron-left"
    />
    <anchor-tag-molecule
        v-if="isCurrentUrl('/register')"
        href="/login"
        class="loginLink"
        label="Log In"
    />
    <anchor-tag-molecule
        v-else
        href="/register"
        class="registerLink"
        label="Register"
    />
</template>

<script setup lang="ts">
import { isCurrentUrl } from '@/utils'
</script>
