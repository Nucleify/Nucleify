<template>
    <div class="testButtonsContainer">
        <button-atom
            label="Test Admin Login"
            @click="testLogin('admin')"
            class="primaryButton"
            :rounded="true"
        />
        <button-atom
            label="Test User Login"
            severity="secondary"
            @click="testLogin('user')"
            class="primaryButton"
            :rounded="true"
        />
    </div>
</template>

<script setup lang="ts">
import { testLogin } from '@/utils'
</script>
