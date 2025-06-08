import type { DataTableInterface, HeadingInterface } from 'atomic'

export interface CardDataTableInterface
  extends DataTableInterface,
    HeadingInterface {
  headerText?: string
  buttonText?: string
}
