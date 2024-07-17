import { Ref, ref } from 'vue'

import { logout } from '@/utils'

import { PositionType } from 'atomic/bosons/types'

export const dockItems = ref([
    {
        img: 'logo.png',
        class: 'logo',
        alt: 'DataManager logo',
        url: '/home',
    },
    {
        icon: 'pi pi-chart-line',
        label: 'Dashboard',
        url: '/dashboard',
    },
    {
        icon: 'pi pi-phone',
        label: 'Contacts',
        url: '/contacts',
    },
    {
        icon: 'pi pi-comment',
        label: 'Articles',
        url: '/articles',
    },
    {
        icon: 'pi pi-history',
        label: 'Activities',
        url: '/activity-log',
    },
    {
        icon: 'pi pi-envelope disabledItem',
        label: 'Messages',
    },
    {
        icon: 'pi pi-check-square disabledItem',
        label: 'Tasks',
    },
    {
        icon: 'pi pi-calendar disabledItem',
        label: 'Calendar',
    },
    {
        icon: 'pi pi-dollar disabledItem',
        label: 'Money',
    },
    {
        icon: 'pi pi-cog',
        label: 'Settings',
        url: '/settings',
    },
    {
        icon: 'pi pi-sign-out',
        label: 'Logout',
        click: logout,
    },
    {
        id: 'position',
    },
])

export const positions: Ref<{ value: PositionType }[]> = ref([
    {
        value: 'top',
    },
    {
        value: 'right',
    },
    {
        value: 'left',
    },
    {
        value: 'bottom',
    },
])
