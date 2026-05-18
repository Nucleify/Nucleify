'use client'

import type { FileUploadBeforeSendEvent } from 'primereact/fileupload'
import { useCallback } from 'react'

import { useAtomicToast } from 'nucleify'

function getCookieValue(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined

  const parts = document.cookie.split(';').map((part) => part.trim())
  const entry = parts.find((part) => part.startsWith(`${name}=`))
  if (!entry) return undefined

  return decodeURIComponent(entry.slice(name.length + 1))
}

const FILE_SIZE_UNITS = ['B', 'KB', 'MB', 'GB', 'TB'] as const

export function formatModuleUploadSize(bytes: number): string {
  const k = 1024
  const decimals = 4
  if (bytes === 0) return `0 ${FILE_SIZE_UNITS[0]}`
  const i = Math.min(
    Math.floor(Math.log(bytes) / Math.log(k)),
    FILE_SIZE_UNITS.length - 1
  )
  const formatted = Number.parseFloat(
    (bytes / Math.pow(k, i)).toFixed(decimals)
  )
  return `${formatted} ${FILE_SIZE_UNITS[i]}`
}

export function useInstallModule(onSuccess: () => void) {
  const { flashToast } = useAtomicToast()

  const onBeforeSend = useCallback(
    (event: FileUploadBeforeSendEvent) => {
      try {
        event.xhr.setRequestHeader('Accept', 'application/json')
        event.xhr.setRequestHeader('Referer-Slug', window.location.pathname)
        const xsrfToken = getCookieValue('XSRF-TOKEN')
        if (xsrfToken) {
          event.xhr.setRequestHeader('X-XSRF-TOKEN', xsrfToken)
        }
      } catch {
        flashToast('Error preparing upload', 'error')
      }
    },
    [flashToast]
  )

  const onUpload = useCallback(() => {
    flashToast('Module installed successfully', 'success')
    onSuccess()
  }, [flashToast, onSuccess])

  const onError = useCallback(() => {
    flashToast('Failed to install module', 'error')
  }, [flashToast])

  return {
    onBeforeSend,
    onUpload,
    onError,
    formatSize: formatModuleUploadSize,
  }
}
