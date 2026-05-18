import { apiHandle, type UseToastInterface } from 'nucleify'

import { nucModulesApiUrl } from '../../utils/api_url'

/**
 * PATCH toggle module. Pass `flashToast` from `useAtomicToast()` in a client component.
 * (Do not call `useAtomicToast` from this module — React hooks rules.)
 */
export async function toggleModule(
  name: string,
  enabled: boolean,
  flashToast: UseToastInterface['flashToast'],
  onSuccess: () => void
): Promise<void> {
  if (!name) {
    flashToast('Module name is required', 'error')
    return
  }

  const action = enabled ? 'disabled' : 'enabled'

  await apiHandle({
    url: nucModulesApiUrl('/modules/toggle'),
    method: 'PATCH',
    data: { name },
    onSuccess: () => {
      flashToast(`Module "${name}" ${action} successfully`, 'success')
      onSuccess()
    },
  })
}
