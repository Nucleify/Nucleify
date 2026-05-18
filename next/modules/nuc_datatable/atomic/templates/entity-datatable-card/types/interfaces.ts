import type { HeadingInterface } from '../../../../../../atomic/atom/heading/types/interfaces'
import type { NucEntityDatatableInterface } from '../../entity-datatable/types/interfaces'

export interface NucEntityDatatableCardInterface
  extends NucEntityDatatableInterface,
    HeadingInterface {
  headerText?: string
  buttonText?: string
}
