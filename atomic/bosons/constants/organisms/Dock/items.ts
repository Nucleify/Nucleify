import { ref } from 'vue'

import { logout } from '@/utils'

export const dockItems = ref([
    {
        logo: true,
        class: 'logo',
        alt: 'DataManager logo',
        url: 'home',
    },
    {
        icon: 'pi pi-chart-line',
        label: 'Dashboard',
        url: 'dashboard',
    },
    {
        icon: 'pi pi-phone',
        label: 'Contacts',
        url: 'contacts',
    },
    {
        icon: 'pi pi-comment',
        label: 'Articles',
        url: 'articles',
    },
    {
        icon: 'pi pi-history',
        label: 'Activities',
        url: 'activity-log',
    },
    {
        icon: 'pi pi-envelope disabled-item',
        label: 'Messages',
    },
    {
        icon: 'pi pi-check-square disabled-item',
        label: 'Tasks',
    },
    {
        icon: 'pi pi-calendar disabled-item',
        label: 'Calendar',
    },
    {
        icon: 'pi pi-dollar disabled-item',
        label: 'Money',
    },
    {
        icon: 'pi pi-cog',
        label: 'Settings',
        url: 'settings',
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
