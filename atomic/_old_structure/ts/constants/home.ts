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
            { icon: 'pi pi-cloud' },
            { icon: 'pi pi-github' }
        ]
    },
    {
        items: [
            { icon: 'pi pi-building' },
            { icon: 'pi pi-sitemap' }
        ]
    },
    {
        items: [
            { icon: 'pi pi-chart-line' },
            { icon: 'pi pi-palette' }
        ]
    },
    {
        items: [
            { icon: 'pi pi-file-pdf' },
            { icon: 'pi pi-database' }
        ]
    },
    {
        items: [
            { icon: 'pi pi-history' },
            { icon: 'pi pi-sync' }
        ]
    },
    {
        items: [
            { icon: 'pi pi-key' },
            { icon: 'pi pi-bell' }
        ]
    }
];