<template>
  <ad-button
    ad-type="main"
    text
    rounded
    icon="prime:upload"
    class="install-module-button"
    @click="visible = true"
  />

  <Dialog 
    v-model:visible="visible" 
    :modal="true" 
    :dismissable-mask="true"
    class="install-module-dialog"
  >
    <template #default>
      <FileUpload 
        name="file"
        :url="apiUrl() + '/modules/install'"
        :maxFileSize="1000000"
        :withCredentials="true"
        @before-upload="beforeUpload"
        @upload="onUpload"
        @error="onError"
      >
        <template #empty>
          <span>Drag and drop files to here to upload.</span>
        </template>
        <template #content="slotProps">
          <div v-for="file in slotProps.files" :key="file.name">
            <span>{{ file.name }}</span>
            <div>{{ formatSize(file.size) }}</div>
          </div>
        </template>
      </FileUpload>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import type { UseToastInterface } from 'atomic'
import { useToast } from 'atomic'

import { usePrimeVue } from 'primevue/config'

const visible = ref(false)

const emit = defineEmits<{
  moduleInstalled: []
}>()

const $primevue = usePrimeVue()

const { flashToast }: UseToastInterface = useToast()

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
      const result = originalOpen.call(this, method, url, async, user, password)

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
  visible.value = false
  emit('moduleInstalled')
}

function onError(): void {
  flashToast('Failed to install module', 'error')
}

function formatSize(bytes: number): string {
  const k = 1024
  const dm = 3
  const sizes = $primevue.config.locale?.fileSizeTypes

  if (bytes === 0) {
    return `0 ${sizes?.[0]}`
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))

  return `${formattedSize} ${sizes?.[i]}`
}
</script>