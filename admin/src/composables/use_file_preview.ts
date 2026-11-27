/** Local object-URL preview for a pending upload file. */
export function useFilePreview() {
  const pendingFile = ref<File | null>(null)
  const previewUrl = ref('')

  function clearPreview() {
    if (previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value)
      previewUrl.value = ''
    }
  }

  function setPending(file: File | null) {
    clearPreview()
    pendingFile.value = file
    if (file && file.type.startsWith('image/')) {
      previewUrl.value = URL.createObjectURL(file)
    }
  }

  onBeforeUnmount(() => {
    clearPreview()
  })

  return {
    pendingFile,
    previewUrl,
    setPending,
    clearPreview,
  }
}
