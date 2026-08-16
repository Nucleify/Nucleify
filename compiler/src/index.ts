/** @nucleify/compiler public API — filled in later phases. */
export const COMPILER_NAME = '@nucleify/compiler'
export const COMPILER_PHASE = 8

export type {
  IrAttr,
  IrBinaryOp,
  IrDerived,
  IrDocument,
  IrExpr,
  IrHandler,
  IrNode,
  IrProp,
  IrPropType,
  IrState,
  IrStmt,
  IrVersion,
} from './ir/types'

export {
  irAttrSchema,
  irDocumentSchema,
  irExprSchema,
  irHandlerSchema,
  irNodeSchema,
  irPropSchema,
  irStmtSchema,
  parseIrDocument,
} from './ir/schema'

export { ParseError, parseNucTsx, parseTsxToIr } from './parse/tsx'
export { discoverNucSources } from './sync/discover'
export { emitVue } from './emit/vue'
export { emitReact } from './emit/react'
export { writeOutputs, EMIT_APP_DIRS } from './sync/write-outputs'
export { scaffoldApp, SCAFFOLD_APPS } from './sync/scaffold'
export { irEventToReact, irEventToVue } from './adapters/events'
