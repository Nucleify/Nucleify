import { StyleValue } from 'vue'

export interface AnchorTagInterface {
    href?: string
    icon?: string
    label?: string
    rel?:
        | 'alternate'
        | 'author'
        | 'bookmark'
        | 'external'
        | 'help'
        | 'license'
        | 'next'
        | 'nofollow'
        | 'noreferrer'
        | 'noopener'
        | 'prev'
        | 'search'
        | 'tag'
    target?: '_blank' | '_parent' | '_self' | '_top'
    tooltip?: string
    anchorClass?: string
    style?: StyleValue
}

export interface HandleStartAnchorTagsInterface {
    anchorTags: AnchorTagInterface[]
}
