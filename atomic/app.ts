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
import { AppType } from 'vite'
import { createApp } from 'vue'

export const app: AppType = createApp({})

import registerOldStructure from './old'
import registerPrimeVue from './primevue'
import { registerAtoms } from './atoms'
import { registerMolecules } from './molecules'
import { registerOrganisms } from './organisms'
import { registerTemplates } from './templates'
import { registerGlobalUtils } from './bosons/utils'

registerOldStructure(app)
registerPrimeVue(app)
registerAtoms(app)
registerMolecules(app)
registerOrganisms(app)
registerTemplates(app)
registerGlobalUtils(app)

app.mount('#app')
