import { reactive } from 'vue'
import {
    DisplayChartsInterface,
    UseDisplayChartsInterface,
} from 'atomic/bosons/types'

export function useDisplayCharts(): UseDisplayChartsInterface {
    const display: DisplayChartsInterface = reactive({
        Activity:
            window.localStorage.getItem('display-activity-graphs') === 'true',
        Admin: window.localStorage.getItem('display-admin-graphs') === 'true',
        Article:
            window.localStorage.getItem('display-article-graphs') === 'true',
        Contact:
            window.localStorage.getItem('display-contact-graphs') === 'true',
    })

    function displayChartsToggle(action: string): void {
        const key = `display-${action.toLowerCase()}-graphs`
        display[action] = !display[action]

        window.localStorage.setItem(key, String(display[action]))

        const radioButton = document.querySelector(`#${action} .p-radiobutton`)

        if (!display[action] && radioButton) {
            radioButton.classList.remove('p-highlight')
        }
    }

    function setDefaultChartsDisplay(reload?: boolean): void {
        const properties: string[] = [
            'display-activity-graphs',
            'display-admin-graphs',
            'display-article-graphs',
            'display-contact-graphs',
        ]

        properties.forEach((property: string): void => {
            window.localStorage.setItem(property, 'true')
        })

        properties.forEach((property) => {
            const key = property.split('-')[1]
            if (Object.prototype.hasOwnProperty.call(display, key)) {
                display[key as keyof DisplayChartsInterface] = true
            }
        })

        if (reload) {
            window.location.reload()
        }
    }

    return {
        display,
        displayChartsToggle,
        setDefaultChartsDisplay,
    }
}
