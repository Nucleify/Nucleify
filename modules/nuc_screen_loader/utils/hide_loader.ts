export function hideLoader(): void {
  const loadContainer: HTMLElement | null = document.querySelector(
    '.screen-loader-container'
  ) as HTMLElement | null

  if (loadContainer) {
    setTimeout((): void => {
      loadContainer.style.display = 'none'
    }, 1500)
  }
}
