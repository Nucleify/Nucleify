import { ColorItemStyleInterface, UseSidebarInterface } from '@/types'
import { handleStyles } from '@/constants'
import { isCurrentUrl } from '@/utils'

export default function useSidebar(): UseSidebarInterface {
    const {
        mainSidebarItemStyle,
        activitySidebarItemStyle,
        articleSidebarItemStyle,
        contactSidebarItemStyle,
    }: {
        mainSidebarItemStyle: ColorItemStyleInterface
        activitySidebarItemStyle: ColorItemStyleInterface
        articleSidebarItemStyle: ColorItemStyleInterface
        contactSidebarItemStyle: ColorItemStyleInterface
    } = handleStyles()

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
