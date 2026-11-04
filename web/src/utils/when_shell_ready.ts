import { whenShellReady } from './shell_scroll'

/** @deprecated Prefer `whenShellReady` — kept for older call sites. */
export function whenHomeReady(root: HTMLElement): Promise<void> {
  return whenShellReady(root)
}
