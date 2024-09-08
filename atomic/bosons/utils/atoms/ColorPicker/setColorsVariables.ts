export function setColorsVariables(): void {
    const items: string[] = ['main', 'activity', 'article', 'contact', 'user']

    const states: string[] = [
        'color',
        'highlight-color',
        'focus-color',
        'selected-color',
        'hover-color',
    ]

    items.forEach((item: string): void => {
        states.forEach((state: string): void => {
            const key: string = `${item}-item-${state}`
            const value: string | null = localStorage.getItem(key)

            if (
                document.documentElement.style.getPropertyValue(`--${key}`) !==
                value
            ) {
                if (value) {
                    document.documentElement.style.setProperty(
                        `--${key}-new`,
                        value
                    )
                }
            }
        })
    })
}
