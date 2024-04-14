import {
    ColorItemStyleInterface,
    ShouldRenderSidebarItemFunctionType,
    UseSidebarInterface,
} from '@/types'
import { handleStyles } from '@/constants'
import { isCurrentUrl } from '@/utils'

export default function useSidebar(): UseSidebarInterface {
    const {
        mainSidebarItemStyle,
        activitySidebarItemStyle,
        contactSidebarItemStyle,
    } = handleStyles()

    const shouldRenderSidebarItem: ShouldRenderSidebarItemFunctionType = (
        url: string
    ) => ['/home', '/admin', '/contacts', '/activity-log'].includes(url)

    function getSidebarItemStyle(url: string): ColorItemStyleInterface | '' {
        if (url === '/home') {
            return isCurrentUrl(url) ? mainSidebarItemStyle : ''
        } else if (url === '/admin') {
            return isCurrentUrl(url) ? mainSidebarItemStyle : ''
        } else if (url === '/contacts') {
            return isCurrentUrl(url) ? contactSidebarItemStyle : ''
        } else if (url === '/activity-log') {
            return isCurrentUrl(url) ? activitySidebarItemStyle : ''
        }
        return ''
    }

    return { shouldRenderSidebarItem, getSidebarItemStyle }
}
