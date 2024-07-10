import { UseSidebarInterface } from '@/types'
import { isCurrentUrl } from '@/utils'

import {
    ColorItemStyleInterface,
    HandleStylesInterface,
} from 'atomic/bosons/types'
import { handleStyles } from 'atomic/bosons/constants'

export default function useSidebar(): UseSidebarInterface {
    const {
        mainItemStyle,
        activityItemStyle,
        articleItemStyle,
        contactItemStyle,
    }: HandleStylesInterface = handleStyles()

    function getSidebarItemStyle(url: string): ColorItemStyleInterface | null {
        if (url === '/contacts') {
            return isCurrentUrl(url) ? contactItemStyle : null
        } else if (url === '/articles') {
            return isCurrentUrl(url) ? articleItemStyle : null
        } else if (url === '/activity-log') {
            return isCurrentUrl(url) ? activityItemStyle : null
        } else {
            return isCurrentUrl(url) ? mainItemStyle : null
        }
    }

    return { getSidebarItemStyle }
}
