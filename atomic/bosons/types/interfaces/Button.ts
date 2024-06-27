export interface ButtonInterface {
    onclick?: (event: MouseEvent) => void
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
    iconClass?: string
    label?: string
    labelClass?: string
    gap?: string
    padding?: string
}
