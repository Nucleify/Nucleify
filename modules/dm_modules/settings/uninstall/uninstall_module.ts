import type { UseToastInterface } from 'atomic'
import { apiHandle, useAtomicToast } from 'atomic'

export async function uninstallModule(
  name: string,
  emit: (event: string) => void
): Promise<void> {
  const { flashToast }: UseToastInterface = useAtomicToast()

  if (!name) {
    flashToast('Module name is required', 'error')
    return
  }

  await apiHandle({
    url: apiUrl() + '/modules/uninstall',
    method: 'POST',
    data: { name: name },
    onSuccess: () => {
      flashToast(`Module "${name}" uninstalled successfully`, 'success')
      emit('moduleUninstalled')
    },
  })
}
