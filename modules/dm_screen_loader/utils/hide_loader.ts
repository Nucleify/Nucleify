import { onMounted } from 'vue'

export function hideLoader(): void {
  onMounted((): void => {
    const loadContainer: HTMLElement | null = document.querySelector(
      '.screen-loader-container'
    ) as HTMLElement | null

    if (loadContainer) {
      setTimeout((): void => {
        loadContainer.style.display = 'none'
      }, 850)
    }
  })
}
