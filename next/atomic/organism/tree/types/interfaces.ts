import type { TreeProps } from 'primereact/tree'
import type { TreeNode } from 'primereact/treenode'

export interface AdTreeNode extends TreeNode {
  type?: string
}

export interface TreeInterface extends TreeProps {}
