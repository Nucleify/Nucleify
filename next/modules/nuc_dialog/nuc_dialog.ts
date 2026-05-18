import type { FC } from 'react'

import { NucDialog } from '.'

import type { NucDialogInterface } from './types'

export function registerNucDialog(
  components: Record<string, FC<NucDialogInterface>>
): void {
  components['nuc-dialog'] = NucDialog
}
