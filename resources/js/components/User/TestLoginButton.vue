<template>
    <button @click="postLogin" class="btn btn-primary">Test Login</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
    setup() {
        function postLogin(): void {
            const email = 'test@example.com'
            const password = 'admin123'

            axios
                .post('/login', { email, password })
                .then((response) => {
                    console.log(response.data)
                    location.href = '/home'
                })
                .catch((error) => {
                    console.error(error)
                })
        }

        return {
            postLogin,
        }
    },
})
</script>
