/* @refresh reload */
import { render } from 'solid-js/web'
import App from './App'
import { setupNui } from '../../../portable/nui'

setupNui({ palette: 'next', mode: 'light' })

render(() => <App />, document.getElementById('root')!)
