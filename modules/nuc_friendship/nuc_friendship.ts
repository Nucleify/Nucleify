import type { App } from 'vue'

import { NucFriendship, NucFriendsList, NucInviteForm } from '.'

export function registerNucFriendship(app: App<Element>): void {
  app
    .component('nuc-friendship', NucFriendship)
    .component('nuc-friends-list', NucFriendsList)
    .component('nuc-invite-form', NucInviteForm)
}
