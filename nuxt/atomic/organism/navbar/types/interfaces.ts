import type { Ref } from 'vue'

export interface UseNavbarInterface {
  navbarExpanded: Ref<boolean>
  toggleNavbar: () => void
}
