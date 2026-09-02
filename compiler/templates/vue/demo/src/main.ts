import { createApp } from 'vue'
import App from './App.vue'
import { setupNui } from '../../../portable/nui'

setupNui({ palette: 'nuxt', mode: 'light' })

createApp(App).mount('#app')
