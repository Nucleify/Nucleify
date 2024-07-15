import { Ref, ref } from 'vue'

import { HomeItemsInterface } from '@/types'

export const homeItems: Ref<HomeItemsInterface[]> = ref([
    {
        id: 1,
        label: 'Contacts',
        href: '/contacts',
        icon: 'pi pi-user',
        disabled: false,
        draggableClass: true,
    },
    {
        id: 2,
        label: 'Articles',
        href: '/articles',
        icon: 'pi pi-comment',
        disabled: false,
        draggableClass: true,
    },
    {
        id: 3,
        label: 'Messages',
        href: '#',
        icon: 'pi pi-envelope',
        disabled: true,
        draggableClass: true,
    },
    {
        id: 4,
        label: 'Tasks',
        href: '#',
        icon: 'pi pi-check-square',
        disabled: true,
        draggableClass: true,
    },
    {
        id: 5,
        label: 'Calendar',
        href: '#',
        icon: 'pi pi-calendar',
        disabled: true,
        draggableClass: true,
    },
    {
        id: 6,
        label: 'Money',
        href: '#',
        icon: 'pi pi-dollar',
        disabled: true,
        draggableClass: true,
    },
    {
        id: 7,
        label: 'Activities',
        href: '/activity-log',
        icon: 'pi pi-clock',
        disabled: false,
        draggableClass: true,
    },
    {
        id: 8,
        label: 'Help',
        href: '#',
        icon: 'pi pi-info-circle',
        disabled: true,
        draggableClass: false,
    },
    {
        id: 9,
        label: 'Settings',
        href: '/settings',
        icon: 'pi pi-cog',
        disabled: false,
        draggableClass: false,
    },
])


export const whyUsData = [
    {
        items: [
            {
                icon: 'pi pi-cloud',
                title: 'Your Own Cloud',
                description: 'Manage and store your data securely with your own cloud'
            },
            {
                icon: 'pi pi-github',
                title: 'Open Source',
                description: 'Enjoy this free template, available for anyone to use and modify'
            }
        ]
    },
    {
        items: [
            {
                icon: 'pi pi-building',
                title: 'Enterprise Solutions',
                description: 'Tailored solutions for large-scale enterprises to optimize operations'
            },
            {
                icon: 'pi pi-share-alt',
                title: 'Share Data',
                description: 'Efficiently share your data with your co-workers'
            }
        ]
    },
    {
        items: [
            {
                icon: 'pi pi-chart-line',
                title: 'Analytics',
                description: 'Gain insights and make data-driven decisions with powerful analytics'
            },
            {
                icon: 'pi pi-palette',
                title: 'Customizable',
                description: 'Customize this template to create a unique look and feel'
            }
        ]
    },
    {
        items: [
            {
                icon: 'pi pi-file-pdf',
                title: 'Many Extensions',
                description: 'Streamline document handling and storage in your work'
            },
            {
                icon: 'pi pi-database',
                title: 'Database Services',
                description: 'Secure and reliable database management services for your data'
            }
        ]
    },
    {
        items: [
            {
                icon: 'pi pi-history',
                title: 'Stay up to date',
                description: 'Track and manage activities efficiently'
            },
            {
                icon: 'pi pi-sync',
                title: 'Synchronization',
                description: 'Keep your data synchronized across devices and platforms'
            }
        ]
    },
    {
        items: [
            {
                icon: 'pi pi-shield',
                title: 'Security',
                description: 'Advanced security solutions to protect your data and systems'
            },
            {
                icon: 'pi pi-bell',
                title: 'Notifications',
                description: 'Real-time notifications to keep you informed of critical events'
            }
        ]
    }
]
