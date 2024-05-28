import { setElementOpacityWithDisplay } from '@/utils'

export default function useUserMenu() {
    const duration = 5
    const delayBetweenItems = 50

    function openUserMenu() {
        const sidebarItems = document.querySelectorAll('.sidebarItems > *')
        const userMenuItems = document.querySelectorAll('.userMenuItems > *')

        const totalSidebarItems = sidebarItems.length

        sidebarItems.forEach((_, index) => {
            const reverseIndex = totalSidebarItems - index - 1
            const nthChildSelector = `.sidebarItems > :nth-child(${
                reverseIndex + 1
            })`

            setTimeout(() => {
                setElementOpacityWithDisplay(nthChildSelector, 0, duration)
            }, delayBetweenItems * index)
        })

        userMenuItems.forEach((_, index) => {
            const nthChildSelector = `.userMenuItems > :nth-child(${index + 1})`

            setElementOpacityWithDisplay(nthChildSelector, 1, duration)
        })

        setElementOpacityWithDisplay('.sidebarUser', 0)

        setTimeout(() => {
            const userMenuElement = document.querySelector(
                '.userMenuItems'
            ) as HTMLElement
            if (userMenuElement) {
                userMenuElement.style.position = 'relative'
                userMenuElement.style.marginTop = '-1000px'
            }
        }, 500)
    }

    function closeUserMenu() {
        const sidebarItems = document.querySelectorAll('.sidebarItems > *')
        const userMenuItems = document.querySelectorAll('.userMenuItems > *')

        sidebarItems.forEach((_, index) => {
            const nthChildSelector = `.sidebarItems > :nth-child(${index + 1})`

            setElementOpacityWithDisplay(nthChildSelector, 1)
        })

        userMenuItems.forEach((_, index) => {
            const nthChildSelector = `.userMenuItems > :nth-child(${index + 1})`

            setElementOpacityWithDisplay(nthChildSelector, 0)
        })

        setTimeout(() => {
            const userMenuElement = document.querySelector(
                '.userMenuItems'
            ) as HTMLElement
            if (userMenuElement) {
                userMenuElement.style.position = ''
                userMenuElement.style.marginTop = ''
            }
        }, 500)

        setElementOpacityWithDisplay('.sidebarUser', 1, 500)
    }

    return { openUserMenu, closeUserMenu }
}
