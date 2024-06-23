/**
 *  Button
 */
export interface ButtonArgsInterface {
    class?: string
    severity?:
        | string
        | 'primary'
        | 'secondary'
        | 'success'
        | 'info'
        | 'warning'
        | 'help'
        | 'danger'
    disabled?: boolean
    raised?: boolean
    rounded?: boolean
    text?: boolean
    outlined?: boolean
}

export interface ButtonInterface {
    args: ButtonArgsInterface
    onclick?: () => {}
    iconClass?: string
    spanClass?: string
    label?: string
    gap?: string
    padding?: string
}
