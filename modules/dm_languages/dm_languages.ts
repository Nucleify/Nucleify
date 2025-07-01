import { App } from 'vue';

import {
  LangSwitcher
} from './components'

export function registerDMLanguages(app: App<Element>): void {
  app
    .component('dm-lang-switcher', LangSwitcher)
};