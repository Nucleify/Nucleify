import { handleStyles } from 'atomic/bosons/constants'
import {
    AnchorTagInterface,
    HandleStylesInterface,
    HandleStartAnchorTagsInterface
} from 'atomic/bosons/types'

export default function handleStartAnchorTags(): HandleStartAnchorTagsInterface {
    const {
        activityItemStyle,
        articleItemStyle,
        contactItemStyle,
        userItemStyle
    }: HandleStylesInterface = handleStyles()

    const anchorTags: AnchorTagInterface[] = [
        {
            href: '/admin',
            anchorClass: 'startItem usersItem',
            tooltip: 'Users',
            icon: 'pi pi-user usersIcon',
            style: userItemStyle
        },
        {
            href: "/contacts",
            anchorClass: "startItem contactsItem",
            tooltip: "Contacts",
            icon: "pi pi-users contactsIcon",
            style: contactItemStyle
        },
        {
            anchorClass: "startItem tasksItem",
            tooltip: "Tasks",
            icon: "pi pi-check-square tasksIcon",
            style: { opacity: 0.4 }
        },
        {
            href: "/articles",
            anchorClass: "startItem articlesItem",
            tooltip: "Articles",
            icon: "pi pi-comment articlesIcon",
            style: articleItemStyle
        },
        {
            anchorClass: "startItem moneyItem",
            tooltip: "Revenues & Expenses",
            icon: "pi pi-dollar moneyIcon",
            style: { opacity: 0.4 }
        },
        {
            href: "/activity-log",
            anchorClass: "startItem activitiesItem",
            tooltip: "Activities",
            icon: "pi pi-clock activitiesIcon",
            style: activityItemStyle
        }
    ]

    return { anchorTags }
}
