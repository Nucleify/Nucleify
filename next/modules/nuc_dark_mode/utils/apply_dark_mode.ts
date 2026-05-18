const DARK_CLASS = 'p-dark'

export function applyDarkMode(value: boolean): void {
  if (typeof document === 'undefined') return

  const html = document.documentElement
  if (value) {
    html.classList.add(DARK_CLASS)
  } else {
    html.classList.remove(DARK_CLASS)
  }
}
