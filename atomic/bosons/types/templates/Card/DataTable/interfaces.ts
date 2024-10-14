import { DataTableInterface, HeadingInterface } from 'atomic/bosons/types'

export interface CardDataTableInterface
  extends DataTableInterface,
    HeadingInterface {
  headerText?: string
  buttonText?: string
}
