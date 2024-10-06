import { WhyUsDataInterface } from 'atomic/bosons/types'

const createItem = (
    icon?: string,
    title?: string,
    description?: string
): WhyUsDataInterface => ({
    icon,
    title,
    description,
})

const whyUsDataArray: WhyUsDataInterface[] = [
    [
        [
            'pi pi-cloud',
            'Your Own Cloud',
            'Manage and store your data securely with your own cloud',
        ],
        [
            'pi pi-github',
            'Open Source',
            'Enjoy this free template, available for anyone to use and modify',
        ],
    ],
    [
        [
            'pi pi-building',
            'Enterprise Solutions',
            'Tailored solutions for large-scale enterprises to optimize operations',
        ],
        [
            'pi pi-share-alt',
            'Share Data',
            'Efficiently share your data with your co-workers',
        ],
    ],
    [
        [
            'pi pi-chart-line',
            'Analytics',
            'Gain insights and make data-driven decisions with powerful analytics',
        ],
        [
            'pi pi-palette',
            'Customizable',
            'Customize this template to create a unique look and feel',
        ],
    ],
    [
        [
            'pi pi-file-pdf',
            'Many Extensions',
            'Streamline document handling and storage in your work',
        ],
        [
            'pi pi-database',
            'Database Services',
            'Secure and reliable database management services for your data',
        ],
    ],
    [
        [
            'pi pi-history',
            'Stay up to date',
            'Track and manage activities efficiently',
        ],
        [
            'pi pi-sync',
            'Synchronization',
            'Keep your data synchronized across devices and platforms',
        ],
    ],
    [
        [
            'pi pi-shield',
            'Security',
            'Advanced security solutions to protect your data and systems',
        ],
        [
            'pi pi-bell',
            'Notifications',
            'Real-time notifications to keep you informed of critical events',
        ],
    ],
]

export const whyUsData: WhyUsDataInterface[] = whyUsDataArray.map(
    (group: WhyUsDataInterface) => ({
        items: group.map(([icon, title, description]) =>
            createItem(icon, title, description)
        ),
    })
)
