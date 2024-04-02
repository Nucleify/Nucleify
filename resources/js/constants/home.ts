import { Ref, ref } from 'vue'

import { HomeItemsInterface } from '@/types'

export const homeItems: Ref<HomeItemsInterface[]> = ref([
    {
        id: 1,
        label: 'Contacts',
        href: '/contacts',
        iconClass: 'pi pi-user',
        disabled: false,
        draggableClass: true,
    },
    {
        id: 2,
        label: 'Posts',
        href: '#',
        iconClass: 'pi pi-comment',
        disabled: true,
        draggableClass: true,
    },
    {
        id: 3,
        label: 'Messages',
        href: '#',
        iconClass: 'pi pi-envelope',
        disabled: true,
        draggableClass: true,
    },
    {
        id: 4,
        label: 'Tasks',
        href: '#',
        iconClass: 'pi pi-check-square',
        disabled: true,
        draggableClass: true,
    },
    {
        id: 5,
        label: 'Calendar',
        href: '#',
        iconClass: 'pi pi-calendar',
        disabled: true,
        draggableClass: true,
    },
    {
        id: 6,
        label: 'Money',
        href: '#',
        iconClass: 'pi pi-dollar',
        disabled: true,
        draggableClass: true,
    },
    {
        id: 7,
        label: 'Activities',
        href: '/activity-log',
        iconClass: 'pi pi-clock',
        disabled: false,
        draggableClass: true,
    },
    {
        id: 8,
        label: 'Help',
        href: '#',
        iconClass: 'pi pi-info-circle',
        disabled: true,
        draggableClass: false,
    },
    {
        id: 9,
        label: 'Settings',
        href: '#',
        iconClass: 'pi pi-cog',
        disabled: true,
        draggableClass: false,
    },
])
