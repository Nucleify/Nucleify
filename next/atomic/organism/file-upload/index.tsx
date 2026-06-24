'use client'

import { FileUpload } from 'primereact/fileupload'
import type { JSX } from 'react'

import type { FileUploadInterface } from './types'

export function AdFileUpload(props: FileUploadInterface): JSX.Element {
  return <FileUpload {...props} />
}
