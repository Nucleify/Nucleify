<template>
    <anchor-tag-atom
        href="/"
        class="backLink"
        icon="pi pi-chevron-left"
    />
    <anchor-tag-atom
        v-if="isCurrentUrl('/register')"
        href="/login"
        class="loginLink"
        label="Log In"
    />
    <anchor-tag-atom
        v-else
        href="/register"
        class="registerLink"
        label="Register"
    />
</template>

<script setup lang="ts">
import { isCurrentUrl } from '@/utils'
</script>
