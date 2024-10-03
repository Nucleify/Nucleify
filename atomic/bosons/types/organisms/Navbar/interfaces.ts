import { Ref } from 'vue'

export interface UseNavbarInterface {
    navbarExpanded: Ref<boolean>
    toggleNavbar: () => void
    throttleHideNavbar: () => void
}
