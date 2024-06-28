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

    function getSidebarItemStyle(url: string): ColorItemStyleInterface | '' {
        if (url === '/contacts') {
            return isCurrentUrl(url) ? contactItemStyle : ''
        } else if (url === '/articles') {
            return isCurrentUrl(url) ? articleItemStyle : ''
        } else if (url === '/activity-log') {
            return isCurrentUrl(url) ? activityItemStyle : ''
        } else {
            return isCurrentUrl(url) ? mainItemStyle : ''
        }
    }

    return { getSidebarItemStyle }
}
