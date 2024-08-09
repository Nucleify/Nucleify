import { StyleValue } from 'vue'

export interface AnchorInterface {
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
    itemClass?: string
    style?: StyleValue
}

export interface HandleAnchorTagsInterface {
    anchorTags: AnchorInterface[]
}
