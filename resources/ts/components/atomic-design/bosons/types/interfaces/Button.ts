export interface ButtonInterface {
    onclick?: () => {}
    buttonClass?: string
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
