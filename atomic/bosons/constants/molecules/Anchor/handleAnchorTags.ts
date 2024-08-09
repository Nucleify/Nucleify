import { AnchorInterface, HandleAnchorTagsInterface } from 'atomic/bosons/types'

export function handleAnchorTags(): HandleAnchorTagsInterface {
    const anchorTags: AnchorInterface[] = [
        {
            href: '/admin',
            anchorClass: 'startItem usersItem',
            tooltip: 'Users',
            icon: 'pi pi-user usersIcon',
        },
        {
            href: '/contacts',
            anchorClass: 'startItem contactsItem',
            tooltip: 'Contacts',
            icon: 'pi pi-users contactsIcon',
        },
        {
            anchorClass: 'startItem tasksItem',
            itemClass: 'disabledItem',
            tooltip: 'Tasks',
            icon: 'pi pi-check-square tasksIcon',
            style: { opacity: 0.4 },
        },
        {
            href: '/articles',
            anchorClass: 'startItem articlesItem',
            tooltip: 'Articles',
            icon: 'pi pi-comment articlesIcon',
        },
        {
            anchorClass: 'startItem moneyItem',
            itemClass: 'disabledItem',
            tooltip: 'Revenues & Expenses',
            icon: 'pi pi-dollar moneyIcon',
            style: { opacity: 0.4 },
        },
        {
            href: '/activity-log',
            anchorClass: 'startItem activitiesItem',
            tooltip: 'Activities',
            icon: 'pi pi-history activitiesIcon',
        },
    ]

    return { anchorTags }
}
