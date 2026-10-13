/** @nucleify/compiler public API — filled in later phases. */
export const COMPILER_NAME = '@nucleify/compiler'
export const COMPILER_PHASE = 13

export {
  IR_VERSION,
  type IrAttr,
  type IrBinaryOp,
  type IrDerived,
  type IrDocument,
  type IrExpr,
  type IrHandler,
  type IrNode,
  type IrProp,
  type IrPropType,
  type IrState,
  type IrStmt,
  type IrVersion,
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
export { parseVueToIr } from './parse/vue'
export { parseReactToIr } from './parse/react'
export { parseSolidToIr } from './parse/solid'
export { parseSvelteToIr } from './parse/svelte'
export { emitNucTsx } from './emit/nuc'
export { discoverNucSources } from './sync/discover'
export { checkWorkspace } from './sync/check'
export { runImport } from './sync/import'
export { emitVue } from './emit/vue'
export { emitReact } from './emit/react'
export { emitSolid } from './emit/solid'
export { emitSvelte } from './emit/svelte'
export { writeOutputs, EMIT_APP_DIRS, PRODUCT_SHELL_EMIT } from './sync/write-outputs'
export {
  scaffoldApp,
  scaffoldDemo,
  scaffoldProduct,
  SCAFFOLD_APPS,
  PRODUCT_IDS,
} from './sync/scaffold'
export { convertProduct } from './sync/convert'

export { irEventToReact, irEventToSvelte, irEventToVue } from './adapters/events'
