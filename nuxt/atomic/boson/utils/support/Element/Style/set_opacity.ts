export function setOpacity(selector: string, opacity: number): void {
  const element: Element | null = document.querySelector(selector + ' div')

  if (element && element instanceof HTMLElement) {
    element.style.opacity = opacity.toString()
  } else {
    console.log('Element not found: ' + selector)
  }
}
