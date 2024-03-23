export default function useColors() {
    const documentStyle: CSSStyleDeclaration = getComputedStyle(
        document.documentElement
    )
    const activityItemColor: string | null = window.localStorage.getItem(
        'activity-item-color'
    )
    const contactItemColor: string | null =
        window.localStorage.getItem('contact-item-color')
    const userItemColor: string | null =
        window.localStorage.getItem('user-item-color')

    function setDefaultColors(): void {
        if (!window.localStorage.getItem('activity-item-color')) {
            window.localStorage.setItem(
                'activity-item-color',
                documentStyle.getPropertyValue('--activity-item-color')
            )
            window.localStorage.setItem(
                'contact-item-color',
                documentStyle.getPropertyValue('--contact-item-color')
            )
            window.localStorage.setItem(
                'user-item-color',
                documentStyle.getPropertyValue('--user-item-color')
            )
        }
    }

    return {
        activityItemColor,
        contactItemColor,
        userItemColor,
        setDefaultColors,
    }
}
