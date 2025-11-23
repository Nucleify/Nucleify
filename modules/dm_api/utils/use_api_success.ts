import type { CloseDialogType, UseToastInterface } from 'atomic'
import { useAtomicToast } from 'atomic'

export function useApiSuccess() {
  const { flashToast }: UseToastInterface = useAtomicToast()

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

    if (flashToast) {
      flashToast(message, 'success')
    } else {
      console.log(message)
    }
  }

  return { apiSuccess }
}
