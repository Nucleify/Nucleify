import { mount } from 'svelte'
import App from './App.svelte'
import { setupNui } from '../../../portable/nui'

setupNui({ palette: 'next', mode: 'light' })

mount(App, { target: document.getElementById('app')! })
