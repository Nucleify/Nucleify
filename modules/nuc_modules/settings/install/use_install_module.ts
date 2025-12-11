import { useCookie } from 'nuxt/app'

import type { UseToastInterface } from 'atomic'
import { useAtomicToast } from 'atomic'

import { usePrimeVue } from 'primevue/config'

export function useInstallModule(onSuccess: () => void) {
  const $primevue = usePrimeVue()
  const { flashToast }: UseToastInterface = useAtomicToast()

  // biome-ignore lint/suspicious/noExplicitAny: fix it later
  function beforeUpload(event: any) {
    try {
      const xsrfToken = useCookie('XSRF-TOKEN')

      const headers: Record<string, string> = {
        Accept: 'application/json',
        'Referer-Slug': window.location.pathname,
      }

      if (xsrfToken.value) {
        headers['X-XSRF-TOKEN'] = xsrfToken.value
      }

      const originalOpen = event.xhr.open
      event.xhr.open = function (
        method: string,
        url: string,
        async: boolean,
        user?: string,
        password?: string
      ) {
        const result = originalOpen.call(
          this,
          method,
          url,
          async,
          user,
          password
        )

        Object.entries(headers).forEach(([key, value]) => {
          this.setRequestHeader(key, value)
        })

        return result
      }

      return event
    } catch (error) {
      flashToast('Error preparing upload', 'error')
      return false
    }
  }

  function onUpload(): void {
    flashToast('Module installed successfully', 'success')
    onSuccess()
  }

  function onError(): void {
    flashToast('Failed to install module', 'error')
  }

  function formatSize(bytes: number): string {
    const k = 1024
    const nuc = 4
    const sizes = $primevue.config.locale?.fileSizeTypes

    if (bytes === 0) {
      return `0 ${sizes?.[0]}`
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(nuc))

    return `${formattedSize} ${sizes?.[i]}`
  }

  return {
    beforeUpload,
    onUpload,
    onError,
    formatSize,
  }
}
