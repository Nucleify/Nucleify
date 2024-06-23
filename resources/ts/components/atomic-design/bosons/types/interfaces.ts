/**
 *  Avatar
 */
export interface AvatarInterface {
    label?: string
    avatarClass?: string
    icon?: string
    image?: string
    size?: "normal" | "large" | "xlarge"
    shape?: "square" | "circle"
    ariaLabel?: string
    ariaLabelledby?: string
    unstyled?: boolean
}

/**
 *  Button
 */
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

/**
 *  Image
 */
export interface ImageInterface {
    src: string
    alt?: string
    width?: string
    height?: string
    imageClass?: string
    preview?: boolean
    unstyled?: boolean
    zoomInDisabled?: boolean
    zoomOutDisabled?: boolean
}
