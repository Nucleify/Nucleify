import { ColorItemColorsInterface } from '../../interfaces'

export default function useColors() {
    const documentStyle: CSSStyleDeclaration = getComputedStyle(
        document.documentElement
    )
    const activityItemColors: ColorItemColorsInterface = {
        primary: window.localStorage.getItem('activity-item-color'),
        hover: window.localStorage.getItem('activity-item-hover-color'),
    }
    const contactItemColors: ColorItemColorsInterface = {
        primary: window.localStorage.getItem('contact-item-color'),
        hover: window.localStorage.getItem('contact-item-hover-color'),
    }
    const userItemColors: ColorItemColorsInterface = {
        primary: window.localStorage.getItem('user-item-color'),
        hover: window.localStorage.getItem('user-item-hover-color'),
    }

    function setDefaultColors() {
        if (!window.localStorage.getItem('activity-item-color')) {
            window.localStorage.setItem(
                'activity-item-color',
                documentStyle.getPropertyValue('--activity-item-color')
            )
            window.localStorage.setItem(
                'activity-item-hover-color',
                documentStyle.getPropertyValue('--activity-item-hover-color')
            )
            window.localStorage.setItem(
                'contact-item-color',
                documentStyle.getPropertyValue('--contact-item-color')
            )
            window.localStorage.setItem(
                'contact-item-hover-color',
                documentStyle.getPropertyValue('--contact-item-hover-color')
            )
            window.localStorage.setItem(
                'user-item-color',
                documentStyle.getPropertyValue('--user-item-color')
            )
            window.localStorage.setItem(
                'user-item-hover-color',
                documentStyle.getPropertyValue('--user-item-hover-color')
            )
        }
    }

    return {
        activityItemColors,
        contactItemColors,
        userItemColors,
        setDefaultColors,
    }
}
