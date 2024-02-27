<template>
    <Button @click="login(credentials)" class="myButton min-w-max">
      Test User Login
    </Button>
</template>

<script setup lang="ts">
import { login } from '../../utils'

const credentials = {
    email: '',
    password: ''
}
</script>
