import type { Ref } from 'vue'

export interface UseDarkModeInterface {
  isDark: Ref<boolean>
  toggleDarkMode: () => void
}
