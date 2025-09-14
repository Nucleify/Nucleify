import type { DMEntityDatatableInterface, HeadingInterface } from 'atomic'

export interface DMEntityDatatableCardInterface
  extends DMEntityDatatableInterface,
    HeadingInterface {
  headerText?: string
  buttonText?: string
}
