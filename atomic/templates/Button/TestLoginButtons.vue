<template>
    <div class="test-buttons-container">
        <button-atom
            label="Test Admin Login"
            @click="testLogin('admin')"
            class="primary-button text-sm"
            :rounded="true"
        />
        <button-atom
            label="Test User Login"
            severity="secondary"
            @click="testLogin('user')"
            class="primary-button text-sm"
            :rounded="true"
        />
    </div>
</template>

<script setup lang="ts">
import { testLogin } from '@/utils'
</script>
