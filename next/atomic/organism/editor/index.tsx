import { Editor } from 'primereact/editor'
import type { JSX } from 'react'

import type { EditorInterface } from './types'

export function AdEditor(props: EditorInterface): JSX.Element {
  return <Editor {...props} />
}
