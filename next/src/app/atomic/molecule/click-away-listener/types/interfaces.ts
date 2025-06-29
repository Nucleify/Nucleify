export interface AdClickAwayListenerInterface {
  children: React.ReactElement
  onClickAway: (event: MouseEvent | TouchEvent) => void
  disableReactTree?: boolean
  mouseEvent?:
    | 'onClick'
    | 'onMouseDown'
    | 'onMouseUp'
    | 'onPointerDown'
    | 'onPointerUp'
    | false
  touchEvent?: 'onTouchEnd' | 'onTouchStart' | false
}
