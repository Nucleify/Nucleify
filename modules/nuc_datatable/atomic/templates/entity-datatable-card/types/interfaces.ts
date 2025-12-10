import type { HeadingInterface, NucEntityDatatableInterface } from 'atomic'

export interface NucEntityDatatableCardInterface
  extends NucEntityDatatableInterface,
    HeadingInterface {
  headerText?: string
  buttonText?: string
}
