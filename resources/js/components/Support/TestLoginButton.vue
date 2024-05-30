<template>
    <div class="testButtonsContainer">
        <Button @click="testLogin('admin')" class="smallHeightButton">
            Test Admin Login
        </Button>

        <Button
            @click="testLogin('user')"
            class="smallHeightButton p-button-secondary"
        >
            Test User Login
        </Button>
    </div>
</template>

<script setup lang="ts">
import { testLogin } from '@/utils'
</script>
