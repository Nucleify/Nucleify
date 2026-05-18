import { Tree } from 'primereact/tree'

import type { TreeInterface } from './types'

export function AdTree(props: TreeInterface) {
  const { className, ...rest } = props
  return (
    <Tree
      {...rest}
      className={[className, 'ad-tree'].filter(Boolean).join(' ')}
    />
  )
}
