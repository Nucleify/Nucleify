/**
 *  Styles
 */
import 'primevue/resources/themes/lara-light-green/theme.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'sass/index.scss'

/**
 *  App
 */
import { App, createApp } from 'vue'

export const app: App<Element> = createApp({})

import registerOldStructure from './old'
import registerPrimeVue from './primevue'
import { registerAtoms } from './atoms'
import { registerMolecules } from './molecules'
import { registerOrganisms } from './organisms'

registerOldStructure(app)
registerPrimeVue(app)
registerAtoms(app)
registerMolecules(app)
registerOrganisms(app)

app.mount('#app')