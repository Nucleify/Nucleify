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
    icon?: string
    label?: string
    gap?: string
    padding?: string
}
