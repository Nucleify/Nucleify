import { UseUserMenuInterface } from '@/types'
import { setElementOpacityWithDisplay } from '@/utils'

export default function useUserMenu(): UseUserMenuInterface {
    const delayBetweenItems: number = 50

    function openUserMenu(): void {
        const sidebarItems: NodeListOf<Element> =
            document.querySelectorAll('.sidebarItems > *')
        const userMenuItems: NodeListOf<Element> =
            document.querySelectorAll('.userMenuItems > *')

        const totalSidebarItems: number = sidebarItems.length

        sidebarItems.forEach((_: Element, index: number): void => {
            const reverseIndex: number = totalSidebarItems - index - 1
            const nthChildSelector: string = `.sidebarItems > :nth-child(${
                reverseIndex + 1
            })`

            setTimeout((): void => {
                setElementOpacityWithDisplay(nthChildSelector, 0)
            }, delayBetweenItems)
        })

        userMenuItems.forEach((item: Element, index: number): void => {
            const nthChildSelector: string = `.userMenuItems > :nth-child(${
                index + 1
            })`

            if (item.classList.contains('disabledItem')) {
                setElementOpacityWithDisplay(nthChildSelector, 0.5)
            } else {
                setElementOpacityWithDisplay(nthChildSelector, 1)
            }
        })

        setTimeout((): void => {
            const userMenuItemsElement: HTMLElement = document.querySelector(
                '.userMenuItems'
            ) as HTMLElement
            userMenuItemsElement.style.marginTop = '-100px'
        }, 500)

        setElementOpacityWithDisplay('.sidebarUser', 0)
    }

    function closeUserMenu(): void {
        const sidebarItems: NodeListOf<Element> =
            document.querySelectorAll('.sidebarItems > *')
        const userMenuItems: NodeListOf<Element> =
            document.querySelectorAll('.userMenuItems > *')

        userMenuItems.forEach((_: Element, index: number): void => {
            const nthChildSelector: string = `.userMenuItems > :nth-child(${
                index + 1
            })`

            setElementOpacityWithDisplay(nthChildSelector, 0)
        })

        const userMenuItemsElement: HTMLElement = document.querySelector(
            '.userMenuItems'
        ) as HTMLElement
        userMenuItemsElement.style.marginTop = '200px'

        setTimeout((): void => {
            sidebarItems.forEach((item: Element, index: number): void => {
                const nthChildSelector: string = `.sidebarItems > :nth-child(${
                    index + 1
                })`

                if (item.classList.contains('disabledItem')) {
                    setElementOpacityWithDisplay(nthChildSelector, 0.5)
                } else {
                    setElementOpacityWithDisplay(nthChildSelector, 1)
                }
            })
            setElementOpacityWithDisplay('.sidebarUser', 1)
        }, 500)
    }

    return { openUserMenu, closeUserMenu }
}
