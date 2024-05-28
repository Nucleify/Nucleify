export default function setElementOpacityWithDisplay(
    selector: string,
    opacity: number,
    delay?: number
): void {
    setTimeout((): void => {
        const element: HTMLElement = document.querySelector(
            selector
        ) as HTMLElement
        if (element) {
            if (opacity === 1) {
                element.style.display = 'flex'
                setTimeout((): void => {
                    element.style.opacity = opacity.toString()
                }, 500)
            } else {
                element.style.opacity = opacity.toString()

                setTimeout((): void => {
                    element.style.display = 'none'
                }, 500)
            }
        }
    }, delay)
}
