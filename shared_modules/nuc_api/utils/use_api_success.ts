import type { ActionType, CloseDialogType } from 'nucleify'
import { flashToast } from 'nucleify'

export function useApiSuccess() {
  async function apiSuccess(
    response?: unknown,
    getData?: () => Promise<void>,
    close?: CloseDialogType,
    action?: ActionType
  ): Promise<void> {
    if (close && action) {
      close(action)
    }

    if (getData) {
      await getData()
    }

    const message =
      (response as Record<'message', string>)?.message ||
      'Operation completed successfully'

    flashToast(message, 'success')
  }

  return { apiSuccess }
}
