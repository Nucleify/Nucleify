export interface ParagraphInterface {
  text?: string | number
  /** When true, render text as-is (no i18n). Use for user emails, names, etc. */
  literal?: boolean
}
