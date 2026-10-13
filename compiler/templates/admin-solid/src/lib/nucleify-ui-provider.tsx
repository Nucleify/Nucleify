import type { JSX } from 'solid-js'

export function NucleifyUiProvider(props: { children: JSX.Element }) {
  return <>{props.children}</>
}
