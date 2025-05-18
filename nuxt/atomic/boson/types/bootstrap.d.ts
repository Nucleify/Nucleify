declare module 'bootstrap' {
  export class Collapse {
    constructor(element: HTMLElement, options?: { toggle?: boolean })
    show(): void
    hide(): void
  }
}
