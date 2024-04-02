<template>
    <div class="flex gap-2">
        <Button @click="testLogin('user')" class="smallHeightButton min-w-max">
            Test User Login
        </Button>

        <Button @click="testLogin('admin')" class="smallHeightButton min-w-max">
            Test Admin Login
        </Button>
    </div>
</template>

<script setup lang="ts">
import { testLogin } from '@/utils'
</script>
