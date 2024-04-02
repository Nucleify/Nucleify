import { ColorItemStyleInterface, HandleStylesInterface } from '@/types'
import { useColors } from '@/utils'

export default function handleStyles(): HandleStylesInterface {
    const {
        mainItemColors,
        activityItemColors,
        contactItemColors,
        userItemColors,
    } = useColors()

    const mainStyle: ColorItemStyleInterface = {
        color: mainItemColors.primary,
        backgroundColor: mainItemColors.sidebarSelected,
        boxShadow: 'none',
    }

    const activityStyle: ColorItemStyleInterface = {
        backgroundColor: activityItemColors.primary,
        borderColor: activityItemColors.primary,
        boxShadow: 'none',
    }

    const contactStyle: ColorItemStyleInterface = {
        backgroundColor: contactItemColors.primary,
        borderColor: contactItemColors.primary,
        boxShadow: 'none',
    }

    const userStyle: ColorItemStyleInterface = {
        backgroundColor: userItemColors.primary,
        borderColor: userItemColors.primary,
        boxShadow: 'none',
    }

    return { mainStyle, activityStyle, contactStyle, userStyle }
}
