import type { MenubarProps } from 'primereact/menubar'
import { Menubar } from 'primereact/menubar'
import type { JSX } from 'react'

export function AdNavbar(props: MenubarProps): JSX.Element {
  return <Menubar {...props} />
}
