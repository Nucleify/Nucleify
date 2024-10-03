<template>
    <div class="test-buttons-container">
        <ad-button
            label="Test Admin Login"
            @click="testLogin('admin')"
            class="primary-button text-sm"
            :rounded="true"
        />
        <ad-button
            label="Test User Login"
            severity="secondary"
            @click="testLogin('user')"
            class="primary-button text-sm"
            :rounded="true"
        />
    </div>
</template>

<script setup lang="ts">
import { testLogin } from 'atomic/bosons/utils'
</script>
