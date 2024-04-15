import { Ref, ref, UnwrapRef } from 'vue'
import { MenuItem } from 'primevue/menuitem'

import { logout } from '@/utils'

export const layoutItems: Ref<UnwrapRef<MenuItem>> = ref<MenuItem>([
    {
        label: 'Home',
        icon: 'pi pi-home',
        url: '/home',
    },
    {
        label: 'Contacts',
        icon: 'pi pi-user',
        url: '/contacts',
    },
    {
        label: 'Posts',
        icon: 'pi pi-comment',
    },
    {
        label: 'Messages',
        icon: 'pi pi-envelope',
    },
    {
        label: 'Tasks',
        icon: 'pi pi-check-square',
    },
    {
        label: 'Calendar',
        icon: 'pi pi-calendar',
    },
    {
        label: 'Money',
        icon: 'pi pi-dollar',
    },
    {
        label: 'Activity Log',
        icon: 'pi pi-clock',
        url: '/activity-log',
    },
    {
        label: 'Help',
        icon: 'pi pi-info-circle',
    },
    {
        label: 'Settings',
        icon: 'pi pi-cog',
        url: '/settings',
    },
])

export const userMenuItems: MenuItem[] = [
    {
        items: [
            {
                label: 'Welcome',
                icon: 'pi pi-home',
                url: '/welcome',
            },
            {
                label: 'Profile',
                icon: 'pi pi-user',
            },
            {
                label: 'Log out',
                icon: 'pi pi-sign-out',
                command: logout,
            },
        ],
    },
]
