import { UseSidebarInterface } from '@/types'
import { isCurrentUrl } from '@/utils'

import {
    ColorItemStyleInterface,
    HandleStylesInterface,
} from 'atomic/bosons/types'
import { handleStyles } from 'atomic/bosons/constants'

export default function useSidebar(): UseSidebarInterface {
    const {
        mainSidebarItemStyle,
        activitySidebarItemStyle,
        articleSidebarItemStyle,
        contactSidebarItemStyle,
    }: HandleStylesInterface = handleStyles()

    function getSidebarItemStyle(url: string): ColorItemStyleInterface | '' {
        if (url === '/contacts') {
            return isCurrentUrl(url) ? contactSidebarItemStyle : ''
        } else if (url === '/articles') {
            return isCurrentUrl(url) ? articleSidebarItemStyle : ''
        } else if (url === '/activity-log') {
            return isCurrentUrl(url) ? activitySidebarItemStyle : ''
        } else {
            return isCurrentUrl(url) ? mainSidebarItemStyle : ''
        }
    }

    return { getSidebarItemStyle }
}
