export interface ButtonInterface {
    class: string
    iconClass: string
    severity:
        | 'primary'
        | 'secondary'
        | 'success'
        | 'info'
        | 'warning'
        | 'help'
        | 'danger'
    label: string
    disabled: boolean
    raised: boolean
    rounded: boolean
    text: boolean
    outlined: boolean
    gap: string
    padding: string
}

export interface InputTextInterface {
    class: string
    type: 'text' | 'number'
    unstyled: boolean
    size: 'small' | 'large'
    variant: 'filled' | 'outlined'
    invalid: boolean
    width: string
    value: string
    height: string
    padding: string
}

export interface ProgressSpinnerInterface {
    class: string
    width: string
    height: string
    strokeWidth: string
    fill: string
    animationDuration: string
}

export interface TextAreaInterface {
    rows: number
    cols: number
    class: string
    disabled: boolean
    autoResize: boolean
    invalid: boolean
}
