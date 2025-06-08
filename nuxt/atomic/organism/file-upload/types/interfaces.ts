export interface FileUploadInterface {
  name?: string
  url?: string
  mode?: 'advanced' | 'basic'
  multiple?: boolean
  accept?: string
  disabled?: boolean
  auto?: boolean
  maxFileSize?: number
  invalidDileSizeMessage?: string
  invalidFileLimitMessage?: string
  invalidFileTypeMessage?: string
  fileLimit?: number
  withCredentials?: boolean
  previewWidth?: number
  chooseLabel?: string
  uploadLabel?: string
  cancelLabel?: string
  customUpload?: boolean
  showUploadButton?: boolean
  showCancelButton?: boolean
  chooseIcon?: string
  uploadIcon?: string
  cancelIcon?: string
  chooseButtonProps?: object
  uploadButtonProps?: object
  cancelButtonProps?: object
  dt?: unknown
  pt?: object
  ptOptions?: object
  unstyled?: boolean
}
