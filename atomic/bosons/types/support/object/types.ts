import {
    ActivityLogInterface,
    ArticleInterface,
    ContactInterface,
    UserInterface,
} from './interfaces'

export type ObjectType =
    | ActivityLogInterface
    | ArticleInterface
    | ContactInterface
    | UserInterface
    | undefined

export type ObjectNameType = 'activity' | 'article' | 'contact' | 'user'
