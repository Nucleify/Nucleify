import { StyleValue } from 'vue'

import { isCurrentUrl } from '@/utils'

import {
    HandleStylesInterface,
    UseItemStylesInterface,
} from 'atomic/bosons/types'
import { handleStyles } from 'atomic/bosons/constants'

export function useItemStyles(): UseItemStylesInterface {
    const {
        mainItemStyle,
        activityItemStyle,
        articleItemStyle,
        contactItemStyle,
    }: HandleStylesInterface = handleStyles()

    function getItemStyles(url: string, current: boolean): StyleValue | null {
        const checkCurrentUrl: boolean = current ? isCurrentUrl(url) : true

        if (url === '/contacts') {
            return checkCurrentUrl ? contactItemStyle : null
        } else if (url === '/articles') {
            return checkCurrentUrl ? articleItemStyle : null
        } else if (url === '/activity-log') {
            return checkCurrentUrl ? activityItemStyle : null
        } else {
            return checkCurrentUrl ? mainItemStyle : null
        }
    }

    return { getItemStyles }
}
