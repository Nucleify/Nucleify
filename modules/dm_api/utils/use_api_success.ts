import {
  ActionType,
  CloseDialogType,
  useToast,
  UseToastInterface,
} from 'atomic'

export function useApiSuccess() {
  const { flashToast }: UseToastInterface = useToast()

  async function apiSuccess(
    response?: any,
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
