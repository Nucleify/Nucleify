'use client'

import { Tree } from 'primereact/tree'
import type { JSX } from 'react'

import type { AdTreeNode, TreeInterface } from './types'

function renderTreeNode(node: AdTreeNode): JSX.Element {
  if (node.type === 'url' && node.data) {
    return (
      <a href={String(node.data)} className={node.className}>
        {node.label}
      </a>
    )
  }

  return <b className={node.className}>{node.label}</b>
}

export function AdTree({ className, ...rest }: TreeInterface): JSX.Element {
  return (
    <Tree
      {...rest}
      className={[className, 'ad-tree'].filter(Boolean).join(' ')}
      nodeTemplate={renderTreeNode}
    />
  )
}
