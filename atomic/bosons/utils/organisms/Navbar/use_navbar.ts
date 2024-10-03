import { ref, onMounted, onUnmounted, Ref } from 'vue'
import { Collapse } from 'bootstrap'

import { UseNavbarInterface } from 'atomic/bosons/types'
import { useThrottle } from 'atomic/bosons/utils'

export function useNavbar(): UseNavbarInterface {
    const { isThrottled, throttle } = useThrottle()
    const navbarExpanded: Ref<boolean> = ref(false)
    let collapseInstance: Collapse

    function toggleNavbar(): void {
        if (isThrottled.value) return

        navbarExpanded.value = !navbarExpanded.value
        if (navbarExpanded.value) {
            collapseInstance.show()
        } else {
            collapseInstance.hide()
        }

        throttle((): void => {
            isThrottled.value = false
        }, 500)
    }

    function hideNavbar(): void {
        if (navbarExpanded.value) {
            collapseInstance.hide()
            navbarExpanded.value = false
        }
    }

    function throttleHideNavbar(): void {
        if (isThrottled.value) return

        hideNavbar()

        throttle((): void => {
            isThrottled.value = false
        }, 500)
    }

    function handleOutsideClick(event: MouseEvent): void {
        const navElement: Element | null = document.querySelector('.navbar')
        const toggleButton: Element | null =
            document.querySelector('.navbar-toggler')
        if (
            navElement &&
            toggleButton &&
            !navElement.contains(event.target as Node) &&
            !toggleButton.contains(event.target as Node)
        ) {
            throttleHideNavbar()
        }
    }

    onMounted((): void => {
        const collapseElement: HTMLElement | null = document.getElementById(
            'navbarSupportedContent'
        )
        if (collapseElement) {
            collapseInstance = new Collapse(collapseElement, { toggle: false })
        }
        document.addEventListener('click', handleOutsideClick)
    })

    onUnmounted((): void => {
        document.removeEventListener('click', handleOutsideClick)
    })

    return {
        navbarExpanded,
        toggleNavbar,
        throttleHideNavbar,
    }
}
