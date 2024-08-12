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
