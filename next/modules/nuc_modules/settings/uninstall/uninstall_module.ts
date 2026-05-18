import { apiHandle, type UseToastInterface } from 'nucleify'

import { nucModulesApiUrl } from '../../utils/api_url'

/**
 * POST uninstall module. Pass `flashToast` from `useAtomicToast()` in a client component.
 */
export async function uninstallModule(
  name: string,
  flashToast: UseToastInterface['flashToast'],
  onSuccess: () => void
): Promise<void> {
  if (!name) {
    flashToast('Module name is required', 'error')
    return
  }

  await apiHandle({
    url: nucModulesApiUrl('/modules/uninstall'),
    method: 'POST',
    data: { name },
    onSuccess: () => {
      flashToast(`Module "${name}" uninstalled successfully`, 'success')
      onSuccess()
    },
  })
}
