import { ColorItemColorsInterface } from '../../interfaces'

export default function useColors() {
    const documentStyle: CSSStyleDeclaration = getComputedStyle(
        document.documentElement
    )
    const activityItemColors: ColorItemColorsInterface = {
        primary: window.localStorage.getItem('activity-item-color'),
        hover: window.localStorage.getItem('activity-item-hover-color'),
        sidebarSelected: window.localStorage.getItem(
            'activity-sidebar-item-selected-color'
        ),
    }
    const contactItemColors: ColorItemColorsInterface = {
        primary: window.localStorage.getItem('contact-item-color'),
        hover: window.localStorage.getItem('contact-item-hover-color'),
        sidebarSelected: window.localStorage.getItem(
            'contact-sidebar-item-selected-color'
        ),
    }
    const userItemColors: ColorItemColorsInterface = {
        primary: window.localStorage.getItem('user-item-color'),
        hover: window.localStorage.getItem('user-item-hover-color'),
    }

    function setDefaultColors(): void {
        const properties: string[] = [
            // Activity properties
            'activity-item-color',
            'activity-item-hover-color',
            'activity-sidebar-item-selected-color',

            // Contact properties
            'contact-item-color',
            'contact-item-hover-color',
            'contact-sidebar-item-selected-color',

            // User properties
            'user-item-color',
            'user-item-hover-color',
        ]

        properties.forEach((property: string) => {
            if (!window.localStorage.getItem(property)) {
                window.localStorage.setItem(
                    property,
                    documentStyle.getPropertyValue(`--${property}`)
                )
            }
        })
    }

    return {
        activityItemColors,
        contactItemColors,
        userItemColors,
        setDefaultColors,
    }
}
