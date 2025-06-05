import type { App } from 'vue'

import { DmFriendship } from '.'

export function registerDMFriendship(app: App<Element>): void {
  app.component('dm-friendship', DmFriendship)
}
