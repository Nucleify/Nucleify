<template>
    <div class="flex gap-2">
        <Button @click="testLogin('user')" class="myButton min-w-max">
          Test User Login
        </Button>

        <Button @click="testLogin('admin')" class="myButton min-w-max">
          Test Admin Login
        </Button>
    </div>
</template>

<script setup lang="ts">
import { testLogin } from '../../utils'
</script>
