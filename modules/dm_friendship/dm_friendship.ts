import type { App } from 'vue'

import { DmFriendship, DmFriendsList, DmInviteForm } from '.'

export function registerDMFriendship(app: App<Element>): void {
  app
    .component('dm-friendship', DmFriendship)
    .component('dm-friends-list', DmFriendsList)
    .component('dm-invite-form', DmInviteForm)
}
