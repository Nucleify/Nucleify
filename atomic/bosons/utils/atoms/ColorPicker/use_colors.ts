import { isCurrentUrl } from 'atomic/bosons/utils'

import {
    ColorItemColorsInterface,
    UseColorsInterface,
} from 'atomic/bosons/types'

export function useColors(): UseColorsInterface {
    const documentStyle: CSSStyleDeclaration = getComputedStyle(
        document.documentElement
    )

    const mainItemColors: ColorItemColorsInterface = {
        primary: window.localStorage.getItem('main-item-color'),
        hover: window.localStorage.getItem('main-item-hover-color'),
        selected: window.localStorage.getItem('main-item-highlight-color'),
    }
    const activityItemColors: ColorItemColorsInterface = {
        primary: window.localStorage.getItem('activity-item-color'),
        hover: window.localStorage.getItem('activity-item-hover-color'),
        selected: window.localStorage.getItem('activity-item-highlight-color'),
    }
    const articleItemColors: ColorItemColorsInterface = {
        primary: window.localStorage.getItem('article-item-color'),
        hover: window.localStorage.getItem('article-item-hover-color'),
        selected: window.localStorage.getItem('article-item-highlight-color'),
    }
    const contactItemColors: ColorItemColorsInterface = {
        primary: window.localStorage.getItem('contact-item-color'),
        hover: window.localStorage.getItem('contact-item-hover-color'),
        selected: window.localStorage.getItem('contact-item-highlight-color'),
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
            'main-item-focus-color',
            'main-item-selected-color',
            'main-item-highlight-color',

            // Activity properties
            'activity-item-color',
            'activity-item-hover-color',
            'activity-item-focus-color',
            'activity-item-selected-color',
            'activity-item-highlight-color',

            // Article properties
            'article-item-color',
            'article-item-hover-color',
            'article-item-focus-color',
            'article-item-selected-color',
            'article-item-highlight-color',

            // Contact properties
            'contact-item-color',
            'contact-item-hover-color',
            'contact-item-focus-color',
            'contact-item-selected-color',
            'contact-item-highlight-color',

            // User properties
            'user-item-color',
            'user-item-hover-color',
            'user-item-focus-color',
            'user-item-selected-color',
            'user-item-highlight-color',
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
