/**
 * Nucleify compiler IR v0.1 — frozen contract (Faza 1).
 * Expressions / statements stay narrow: literal | ident | member | binary | call | object.
 */

export type IrVersion = '0.1.0'

export type IrPropType = 'string' | 'number' | 'boolean' | 'unknown'

export type IrProp = {
  name: string
  type: IrPropType
  optional?: boolean
  default?: unknown
}

export type IrExpr =
  | { kind: 'literal'; value: string | number | boolean | null }
  | { kind: 'ident'; name: string }
  | { kind: 'member'; object: IrExpr; property: string }
  | { kind: 'index'; object: IrExpr; index: IrExpr }
  | { kind: 'conditional'; test: IrExpr; consequent: IrExpr; alternate: IrExpr }
  | { kind: 'binary'; op: IrBinaryOp; left: IrExpr; right: IrExpr }
  | { kind: 'call'; callee: IrExpr; args: IrExpr[] }
  | { kind: 'object'; properties: { key: string; value: IrExpr }[] }
  | { kind: 'array'; elements: IrExpr[] }
  | { kind: 'raw'; code: string }

export type IrBinaryOp = '==' | '!=' | '===' | '!==' | '&&' | '||' | '+' | '-' | '*' | '/' | '<' | '<=' | '>' | '>=' | '??'

export type IrStmt =
  | { kind: 'expr'; value: IrExpr }
  | { kind: 'assign'; target: IrExpr; value: IrExpr }
  | { kind: 'return'; value?: IrExpr }
  | { kind: 'const'; name: string; value: IrExpr }

export type IrState = { name: string; initial: IrExpr }
export type IrDerived = { name: string; from: IrExpr }
export type IrHandler = { name: string; params: string[]; body: IrStmt[] }

export type IrAttr =
  | { kind: 'static'; name: string; value: string | boolean | number }
  | { kind: 'bind'; name: string; value: IrExpr }
  | { kind: 'event'; name: string; handler: string }

export type IrNode =
  | { kind: 'element'; tag: string; props: IrAttr[]; children: IrNode[] }
  | { kind: 'text'; value: string }
  | { kind: 'expr'; value: IrExpr }
  | { kind: 'if'; test: IrExpr; then: IrNode[]; else?: IrNode[] }
  | { kind: 'for'; source: IrExpr; item: string; index?: string; body: IrNode[] }
  | { kind: 'slot'; children?: IrNode[] }
  | { kind: 'component'; name: string; props: IrAttr[]; children: IrNode[] }

export type IrDocument = {
  irVersion: IrVersion
  name: string
  portable: true
  props: IrProp[]
  state: IrState[]
  derived: IrDerived[]
  handlers: IrHandler[]
  template: IrNode
  styles?: { css?: string }
  /** Preserved import lines from `<script setup>` (product convert). */
  imports?: string[]
  /** Raw setup statements (onMounted, watch, module `let`, …) pasted into emit. */
  sideEffects?: string[]
  meta?: { sourcePath?: string }
}
