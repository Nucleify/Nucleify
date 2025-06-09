import type { Ref } from 'vue'
import { ref } from 'vue'

import type { UseNavbarInterface } from 'atomic'

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
