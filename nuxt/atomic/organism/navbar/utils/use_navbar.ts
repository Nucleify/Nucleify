import { ref, Ref } from 'vue'

import { UseNavbarInterface } from 'atomic'

export function useNavbar(): UseNavbarInterface {
  const navbarExpanded: Ref<boolean> = ref(false)

  function toggleNavbar(): void {
    navbarExpanded.value = !navbarExpanded.value
  }

  return {
    navbarExpanded,
    toggleNavbar,
  }
}
