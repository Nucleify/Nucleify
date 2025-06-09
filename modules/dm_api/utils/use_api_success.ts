import type { ActionType, CloseDialogType, UseToastInterface } from 'atomic'
import { useToast } from 'atomic'

export function useApiSuccess() {
  const { flashToast }: UseToastInterface = useToast()

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

    const message = response?.message || 'Operation completed successfully'

    if (flashToast) {
      flashToast(message, 'success')
    } else {
      console.log(message)
    }
  }

  return { apiSuccess }
}
