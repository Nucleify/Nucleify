import { ColorItemColorsInterface, UseColorsInterface } from '@/types'
import { isCurrentUrl } from '@/utils'

export default function useColors(): UseColorsInterface {
    const documentStyle: CSSStyleDeclaration = getComputedStyle(
        document.documentElement
    )

    const mainItemColors: ColorItemColorsInterface = {
        primary: window.localStorage.getItem('main-item-color'),
        hover: window.localStorage.getItem('main-item-hover-color'),
        sidebarSelected: window.localStorage.getItem(
            'main-sidebar-item-selected-color'
        ),
    }
    const activityItemColors: ColorItemColorsInterface = {
        primary: window.localStorage.getItem('activity-item-color'),
        hover: window.localStorage.getItem('activity-item-hover-color'),
        sidebarSelected: window.localStorage.getItem(
            'activity-sidebar-item-selected-color'
        ),
    }
    const articleItemColors: ColorItemColorsInterface = {
        primary: window.localStorage.getItem('article-item-color'),
        hover: window.localStorage.getItem('article-item-hover-color'),
        sidebarSelected: window.localStorage.getItem(
            'article-sidebar-item-selected-color'
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

    function setDefaultColors(initial: boolean): void {
        const properties: string[] = [
            // Main properties
            'main-item-color',
            'main-item-hover-color',
            'main-sidebar-item-selected-color',

            // Activity properties
            'activity-item-color',
            'activity-item-hover-color',
            'activity-sidebar-item-selected-color',

            // Article properties
            'article-item-color',
            'article-item-hover-color',
            'article-sidebar-item-selected-color',

            // Contact properties
            'contact-item-color',
            'contact-item-hover-color',
            'contact-sidebar-item-selected-color',

            // User properties
            'user-item-color',
            'user-item-hover-color',
        ]

        if (initial) {
            properties.forEach((property: string): void => {
                if (!window.localStorage.getItem(property)) {
                    window.localStorage.setItem(
                        property,
                        documentStyle.getPropertyValue(`--${property}`)
                    )
                }
            })
        } else {
            properties.forEach((property: string): void => {
                window.localStorage.setItem(
                    property,
                    documentStyle.getPropertyValue(`--${property}`)
                )
                isCurrentUrl('/settings') ? window.location.reload() : ''
            })
        }
    }

    return {
        mainItemColors,
        activityItemColors,
        articleItemColors,
        contactItemColors,
        userItemColors,
        setDefaultColors,
    }
}
