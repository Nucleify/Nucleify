<template>
    <div class="testButtonsContainer">
        <Button @click="testLogin('admin')" class="primaryButton p-button-rounded">
            Test Admin Login
        </Button>

        <Button
            @click="testLogin('user')"
            class="primaryButton p-button-rounded p-button-secondary"
        >
            Test User Login
        </Button>
    </div>
</template>

<script setup lang="ts">
import { testLogin } from '@/utils'
</script>
