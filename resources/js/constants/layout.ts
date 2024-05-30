import { Ref, ref, UnwrapRef } from 'vue'
import { MenuItem } from 'primevue/menuitem'

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
        label: 'Articles',
        icon: 'pi pi-comment',
        url: '/articles',
    },
    {
        label: 'Activity Log',
        icon: 'pi pi-clock',
        url: '/activity-log',
    },
    {
        label: 'Messages',
        icon: 'pi pi-envelope',
        class: 'disabledItem',
    },
    {
        label: 'Tasks',
        icon: 'pi pi-check-square',
        class: 'disabledItem',
    },
    {
        label: 'Calendar',
        icon: 'pi pi-calendar',
        class: 'disabledItem',
    },
    {
        label: 'Money',
        icon: 'pi pi-dollar',
        class: 'disabledItem',
    },
])

export const userMenuItems: Ref<UnwrapRef<MenuItem>> = ref<MenuItem>([
    {
        label: 'Welcome',
        icon: 'pi pi-home',
        url: '/welcome',
    },
    {
        label: 'Profile',
        icon: 'pi pi-user',
        class: 'disabledItem',
    },
    {
        label: 'Help',
        icon: 'pi pi-info-circle',
        class: 'disabledItem',
    },
    {
        label: 'Settings',
        icon: 'pi pi-cog',
        url: '/settings',
    },
])
