import { AxiosResponse } from 'axios'

import {
  ActionType,
  CloseDialogFunctionType,
  FlashToastFunctionType,
} from 'atomic/bosons/types'

export async function apiSuccess(
  response: AxiosResponse,
  getData: () => Promise<void>,
  flashToast: FlashToastFunctionType,
  close: CloseDialogFunctionType,
  action: ActionType
): Promise<void> {
  close(action)
  await getData()
  flashToast(response.data.message, 'success')
}
