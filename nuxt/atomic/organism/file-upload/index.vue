<template>
  <FileUpload
    :name="props.name"
    :url="props.url"
    :mode="props.mode"
    :multiple="props.multiple"
    :accept="props.accept"
    :disabled="props.disabled"
    :auto="props.auto"
    :max-file-size="props.maxFileSize"
    :invalid-dile-size-message="props.invalidDileSizeMessage"
    :invalid-file-limit-message="props.invalidFileLimitMessage"
    :invalid-file-type-message="props.invalidFileTypeMessage"
    :file-limit="props.fileLimit"
    :with-credentials="props.withCredentials"
    :preview-width="props.previewWidth"
    :choose-label="props.chooseLabel"
    :upload-label="props.uploadLabel"
    :cancel-label="props.cancelLabel"
    :custom-upload="props.customUpload"
    :show-upload-button="props.showUploadButton"
    :show-cancel-button="props.showCancelButton"
    :choose-icon="props.chooseIcon"
    :upload-icon="props.uploadIcon"
    :cancel-icon="props.cancelIcon"
    :choose-button-props="props.chooseButtonProps"
    :upload-button-props="props.uploadButtonProps"
    :cancel-button-props="props.cancelButtonProps"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import type { FileUploadInterface } from 'atomic'

const props = defineProps<FileUploadInterface>()
</script>
