import { reactive } from 'vue'

import { DisplayGraphsInterface, UseDisplayGraphsInterface } from '@/types'

export default function useDisplayGraphs(): UseDisplayGraphsInterface {
    const display: DisplayGraphsInterface = reactive({
        Activity:
            window.localStorage.getItem('display-activity-graphs') !== 'false',
        Admin: window.localStorage.getItem('display-admin-graphs') !== 'false',
        Contact:
            window.localStorage.getItem('display-contact-graphs') !== 'false',
    })

    function displayGraphsToggle(action: string): void {
        switch (action) {
            case 'Activity':
                window.localStorage.setItem(
                    'display-activity-graphs',
                    String(!display.Activity)
                )
                break
            case 'Admin':
                window.localStorage.setItem(
                    'display-admin-graphs',
                    String(!display.Admin)
                )
                break
            case 'Contact':
                window.localStorage.setItem(
                    'display-contact-graphs',
                    String(!display.Contact)
                )
                break
            default:
                break
        }
    }

    function allGraphsDisplayToggle(): void {
        for (const key in display) {
            if (Object.prototype.hasOwnProperty.call(display, key)) {
                const currentValue: boolean = display[key]
                window.localStorage.setItem(
                    `display-${key.toLowerCase()}-graphs`,
                    String(!currentValue)
                )
            }
        }
    }

    function setDefaultGraphsDisplay(): void {
        const properties: string[] = [
            'display-admin-graphs',
            'display-activity-graphs',
            'display-contact-graphs',
        ]

        properties.forEach((property: string): void => {
            window.localStorage.setItem(property, 'true')
        })
    }

    return {
        display,
        displayGraphsToggle,
        setDefaultGraphsDisplay,
        allGraphsDisplayToggle,
    }
}
